import React from 'react';
import {connect} from 'react-redux';
import Level1 from './Level1';
import Grid from '@material-ui/core/Grid';
import {Axios} from '../../../utils';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
// import CartPopup from '../../Cart-popup/Cart-popup';
import Skeleton from '@material-ui/lab/Skeleton';
import { CONTENT_WIDTH } from '../../../lib/Themes/Mobile';
import { Cart } from '../../Cart/Cart';

const PrimaryMenubar = (props) => {

  const [showCart, setShowCart] = React.useState(false)

  const handleScroll = () => {
    const ele = document.querySelector('#stick-point');
    if(ele !== null || ele !== undefined) {
      const top = ele.getBoundingClientRect().top
      if (top < 0) {
        setShowCart(true)
      } else {
        setShowCart(false)
      }
    }
  }

  function renderMainMenuItems(data) {
    return data.map((mainMenuItem, index) => {
        return (
          <li  key={index} className="mainMenuItem">
            <Level1 mainMenuItem={mainMenuItem} index={index}/>
          </li>
        )
    })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])
  return (
    <>
    <div id="stick-point"></div>
    <Grid container justify="center" className="primaryMenubar-container">
      <Grid item 
        xs={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_XS}
        sm={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_SM}
        md={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_MD}
        lg={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_LG}
        xl={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_XL} className="primaryMenubar-div">
        {props.data.length > 0 ? (<ul className="primaryMenubar">
          {renderMainMenuItems(props.data)}
        </ul>) : (<Skeleton animation="wave" style={{ width: '100%'}} height={30}/>)}
        {showCart && <Cart small />}
      </Grid>
    </Grid>
    </>
  )
}
export default PrimaryMenubar;