import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import InputBase from '@material-ui/core/InputBase';
import {StyledGreenButton} from '../../lib/Themes/StyledComponents';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { asyncAddToCart } from '../../store/asyncActions/asyncActions';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { enqueueSnackbar } from '../../store/actions/notification.actions';
import { CircularProgress, Hidden } from '@material-ui/core';
import { Axios } from '../../utils';
import { MobileTheme } from '../../lib/Themes/Mobile';
import {localAddToCart} from '../../utils/localCart';
import { loadLocalCart, setBulk, resetAddToCart, successAddToCart } from '../../store/actions/cart.action';
import { CartWhiteIcon, PositiveIcon, NegativeIcon } from '../../lib/Themes/icons';

const QuantityInput = withStyles({
  root: {
    fontSize: '15px',
    borderRight: '1px solid rgba(211, 48, 47, 0.5)',
    borderLeft: '1px solid rgba(211, 48, 47, 0.5)',
    width: '30%',
    height: '25px'
  },
  input: {
    textAlign: 'center'
  }
})(InputBase)

const StyledSubscribe = styled.button`
  color: ${props => props.theme.primaryOnColor};
  border: none;
  display: flex; 
  align-items: center; 
  background: ${props => props.theme.secondaryColor};
  justify-content: center;
  text-transform: none;
  height: 100%;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  pointer-events: ${props => props.Loading || props.subscribed ? 'none' : 'auto'};
`

const EmailInput = withStyles({
  root: {
    borderRadius: '5px',
    padding: '3px 10px',
    fontSize: '12px',
    width: '75%',
    background: '#f2f2f2',
    height: '40px',
    maxWidth: '380px',
    color: MobileTheme.primaryColorV2
  }
})(InputBase)

const StyledButtons = styled.button`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: #3d3d3d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border: none;
  height: 25px;
  width: 30%;
  /* min-width: 40px; */
  font-size: 20px;
  opacity: ${props => props.disabled ? 0.5 : 'none'};
  background: none;
  outline-color: transparent;
  outline: none;
  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
` 

const GridItemQuantity = styled.div`
  align-items: center;
  background: #9c0000;
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  width: 40px;
  height: 40px;
  top: 3%;
  left: 5%;
`


const StyledSpan = styled.span`
  font-size: ${props => props.sku ? '12px' : props.theme.p};
  color: ${props => props.sku ? props.theme.primaryColorV3 : props.theme.secondaryColor};
  margin-bottom: 15px;
`

const StyledDesc = styled.p`
  text-align: center;
  font-size: ${props => props.theme.span};
  /* font-weight: bold; */
  color: ${props => props.theme.primaryColorV1};
  max-width: 95%;
  margin: 10px 0px 0px;
  height: 80px;
  overflow: hidden;
`

const StyledImage = styled.img`
  height: 30vh;
  width: 30vw;
  min-width: 150px;
  max-width: 210px;
  max-height: 210px;
  object-fit: contain;
`

const ProductCard = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    justify-content: center;
    position: relative;
    margin: 10px 0px 5px;
    padding: 10px 0px;
    background: ${props => props.theme.productCardBackground};
    overflow: hidden;
    width: 100%;
  @media only screen and (min-width: 600px) {
    margin: 20px 10px;
    box-shadow: 0px 0px 3px rgba(0,0,0,0);
    transition: all 0.2s linear;
    &:hover {
      box-shadow: 0 18px 19px -7px rgba(0,0,0,.17);
    }
  }
`

const QuantityDiv = styled.div`
  width: 85px; 
  height: 20px; 
  background: #f2f2f2; 
  margin-bottom: 20px; 
  border-radius: 2px;
  color: ${props => props.outofstock ? props.theme.secondaryColor : props.theme.secondaryMenubarColor };
  font-size: 12px; 
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function GridItem (props) {

  const dispatch = useDispatch()


  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false)
  const [itemQuantity, setItemQuantity] = useState(0);

  const user = useSelector(state => state.checkoutReducer.userData)
  const addToBulk = useSelector(state => state.cartReducer.addToBulk)
  const {customerDto} = user;

  React.useEffect(() => {
    if(customerDto) {
      setEmail(customerDto.email)
    }
  }, [customerDto])

  const makeApiToNotify = async (tag) => {
    try {
      let res;
      setLoading(true)
      res = await Axios.post('/ecommerce/product/notifyWhenInStock', [{...props.product, customerId: 1, email: email, active: true}])
      if (res.status === 201) {
        dispatch(enqueueSnackbar({
          message: 'Subscribed successfully',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
          },
      }))
      setSubscribed(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribeClick = async () => {
    //First Validating Email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      return dispatch(enqueueSnackbar({
        message: 'Invalid Email',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
        },
    }))
    } 
      makeApiToNotify('master')
  }


  


  const turncateString = (str) => {
    if (str.length > 105) {
      const shortStr = str.substr(0,105);
      return `${shortStr}...`;
    } else {
      return str;
    }
  }

  const handleItemQuantity = (operator) => {
    if (operator === 'add') {
      if(itemQuantity === props.product.availableQuantity) {
        dispatch(enqueueSnackbar({
          message: `Max available quantity ${props.product.availableQuantity}!`,
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'warning',
          },
      }))
      return
      }
      setItemQuantity(itemQuantity + 1)
    } else if (operator === 'subtract') {
      if(itemQuantity <= 0) return
      setItemQuantity(itemQuantity - 1)
    } else {
      return 
    }
  }

  const handleInputChange = (e) => {
    if(Number(e.target.value) > props.product.availableQuantity){
      dispatch(enqueueSnackbar({
        message: `Max available quantity ${props.product.availableQuantity}!`,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    return
    }
    if(e.target.value === '' || Number(e.target.value) >= 0) {
      setItemQuantity(Number(e.target.value))
    }
  }


  const handleAddToCart = async () => {
    if(customerDto) {
      dispatch(asyncAddToCart([{...props.product, quantity: itemQuantity <= 0 ? 1 : itemQuantity, insertedTimestamp: "2020-06-10 17:58:17", updatedBy: 1, customerId: 1}]))
    } else {
      await localAddToCart([{...props.product, quantity: itemQuantity <= 0 ? 1 : itemQuantity, insertedTimestamp: "2020-06-10 17:58:17", updatedBy: 1, customerId: 1}])
      dispatch(enqueueSnackbar({
        message: 'Product added to cart!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
        },
    }))
    dispatch(loadLocalCart())
    dispatch(successAddToCart())
    dispatch(resetAddToCart())
    }
      setItemQuantity(0)
  }

  React.useEffect(() => {
    if(itemQuantity > 0 && addToBulk === true) {
      handleAddToCart()
    }
    dispatch(setBulk(false))
  },[addToBulk])

  return (
    <div css={`display: inline-flex!important; position: relative; justify-content: center; width: 100%;`}>
      <ProductCard>
      {props.product.tags && props.product.tags.length > 0 ?
        <div css={`
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 80px;
        height: 80px;
        background-color: ${props => props.theme.secondaryColor};
        border-radius: 50%;
        top: -30px;
        right: -30px;
        z-index: 1;
        font-size: 12px;
        svg {
          font-size: 12px;
        }
      `}>
      {props.product.tags && props.product.tags.length > 0 ?
        (
          <div css={`
            align-items: center;
            display: flex;
            justify-content: flex-start;
            color: white;
            padding: 3px 5px;
            margin: 5px 0;
            position: relative;
            width: 100%;
            height: 100%;
          `}>
            <span css={`word-break: break-word; width: 30px; position: absolute; bottom: 7px; left: 18px;`}>{props.product.tags[0] === 'Featured Product' ? 'Featured' : props.product.tags[0]}</span>
          </div>
        )
        :
        null
      }
      </div>
      : 
      null
      }
      <div css={`
        position: relative;
        cursor: pointer;
      `}>
        <StyledImage onClick={() => Router.push(`/products/[product]?id=${props.product.productId}`,`/products/${props.product.productId}?id=${props.product.productId}`)} effect="blur" src={props.product.imageUrl ? props.product.imageUrl : 'https://image.shutterstock.com/image-vector/photo-coming-soon-symbol-600w-161251868.jpg'} />
      </div>
      <StyledDesc onClick={() => Router.push(`/products/[product]?id=${props.product.productId}`,`/products/${props.product.productId}?id=${props.product.productId}`)}>{props.product.productName ? turncateString(props.product.productName) : 'Product Name'}</StyledDesc>
      <StyledSpan sku>SKU: {props.product.sku ? props.product.sku : 'N/A'}</StyledSpan>

        <StyledSpan>$ {props.product.standardPrice ? props.product.standardPrice : 'Price'}</StyledSpan>
          {props.product.availableQuantity > 0 ?
          <>
          <QuantityDiv>
            In-stock: {props.product.availableQuantity > 50 ? '+50' : props.product.availableQuantity}
          </QuantityDiv>
          <div grid={props.grid} css={`
            width: ${props => props.grid ? '95%' : '60%'};
            display: flex;
            height: 40px;
            align-items: center;
            justify-content: space-between;
            @media only screen and (min-width: 600px) {
              width: 90%;
            }
          `}>
          <div css={`
                display: flex; 
                width: 70%;
                align-items: center;
                justify-content: space-between;
                padding: 6.5px 0px;
                border-radius: 5px;
                background: #f9f9f9;
                box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                `}>
            <StyledButtons grid={props.grid} onClick={() => handleItemQuantity('add')}><PositiveIcon /></StyledButtons>
            <QuantityInput onChange={(e) => handleInputChange(e)} type="text" value={itemQuantity.toString()} />
            <StyledButtons grid={props.grid} minus onClick={() => handleItemQuantity('subtract')}><NegativeIcon /></StyledButtons>
          </div>
          <StyledSubscribe css={`
                box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);`} Loading={loading} onClick={() => handleAddToCart()}>{loading ? <CircularProgress size={20} /> : <CartWhiteIcon />}</StyledSubscribe>
          </div>
          </>
          :
          <>
          <QuantityDiv outofstock>Out of stock</QuantityDiv>
          <div css={`
            width: 90%; 
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            @media only screen and (min-width: 600px) {
              & input {
                display: block;
              }
            }`}>
            <Hidden xsDown>
              <EmailInput onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" variant="outlined" value={email} />
              <StyledSubscribe subscribed={subscribed} Loading={loading} onClick={handleSubscribeClick}>{loading ? <CircularProgress size={20} style={{color: '#fff'}} /> : <NotificationsActiveIcon fontSize="small" />}</StyledSubscribe>
            </Hidden>
            <Hidden smUp>
              <StyledSubscribe css={`width: 70%; margin: 0 auto; 
                box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);`} subscribed={subscribed} Loading={loading} onClick={handleSubscribeClick}>{loading ? <CircularProgress size={20} /> : <NotificationsActiveIcon fontSize="small" />}<span css={`margin-left: 5px;`}>{subscribed ? 'Subscribed' : 'Notify Me'}</span></StyledSubscribe>
            </Hidden>
          </div>
          </>
          }
    </ProductCard>
    {itemQuantity > 0 ? <GridItemQuantity>{itemQuantity}</GridItemQuantity> : null}
    </div>
  )
}
