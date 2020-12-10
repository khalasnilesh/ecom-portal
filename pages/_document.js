import Document, {Head, Main, NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles'
import flush from "styled-jsx/server"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Creating an instance of the ServerStyleSheet for styled-components and Material-UI
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage


    // This line of code will retrieve the styles from the components and material-ui components
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(sheets.collect(<App {...props} />)),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }

  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}