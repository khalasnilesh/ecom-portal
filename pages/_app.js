import { Provider } from "react-redux";
import App from "next/app";
import withReduxStore from "../lib/with-redux-store";
import { MobileTheme } from "../lib/Themes/Mobile";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {AnimatePresence} from 'framer-motion';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import "../styles/_header.scss";
import "../styles/_footer.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-alice-carousel/lib/alice-carousel.css";
import 'nprogress/nprogress.css';
// For notifications
import { SnackbarProvider } from 'notistack';
import Notifier from '../components/Notifier/Notifier';
import Router from 'next/router';
import NProgress from 'nprogress';
import StateLoader from '../lib/persist-store';
import dynamic from 'next/dynamic';
import { initializeLocalCart } from "../utils/localCart";

const Login = dynamic(() => import("../components/Header/Login/Login"), {ssr: false});
//Binding events. 
Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
}); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

/**
 * @param GlobalStyle
 * Here we define the global css
 * where we can write css for elements like body and html
 */
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: ${(props) =>
      props.theme.bodyBackground ? props.theme.bodyBackground : "white"};
    color: #000;
    font-family: 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
  }
`;

class MyApp extends App {

  /**
   * The css files are generated two times for the material ui
   * So deleting the extra file in the component did mount
   */
  componentDidMount() {
    const stateLoader = new StateLoader()
    const savedState = stateLoader.loadState()
    // const newState = this.props.store.getState();
    const updatedState = Object.assign({}, savedState)
    this.props.store.subscribe(() => {
      stateLoader.saveState(this.props.store.getState())
    })

    initializeLocalCart()

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <ThemeProvider theme={MobileTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            <Notifier />
            <Header />
            <AnimatePresence exitBeforeEnter>
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
            <ScrollToTop />
            <Footer />
            <Login />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default withReduxStore(MyApp);
