import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { enqueueSnackbar } from '../../store/actions/notification.actions';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import Link from 'next/link';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { asyncfetchCartState, asyncRemoveSelectedFromCart } from '../../store/asyncActions/asyncActions';
import UseDidMountEffect from '../Custom-UseEffect/UseDidMountEffect';
import axios from 'axios';
import { loadSavedLocalCart, localRemoveFromCart, localUpdateCart } from '../../utils/localCart';
import { loadLocalCart } from '../../store/actions/cart.action';
import { ADD_TO_CART_SUCCESS } from '../../store/constants';
import { CartWhiteIcon } from '../../lib/Themes/icons';

//CART POPUP
const QuantityInput = withStyles({
  root: {
    border: '1px solid #A9A9A9',
    padding: '10px',
    fontSize: '12px',
    width: '45px',
    height: '35px'
  }
})(InputBase)

const StyledCartPopup = styled.div`
  display: ${props => props.showCart ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${props => props.bottom ? '-170px' : '0'};
  top: ${props => props.bottom ? 'unset' : '60%'};
  bottom: ${props => props.bottom ? '53px' : 'unset'};
  width: 300px;
  min-height: 50px;
  background: #fff;
  font-size: ${props => props.theme.span};
  border-width: 6px 0 0 0;
  border-style: solid;
  border-color: ${props => props.theme.secondaryColor};
  border-radius: 8px 8px 5px 5px;
  color: #777;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  z-index: 5;
`

const CartPopupContainer = styled.div`
  padding: 10px;
  width: 100%;
  h3 {
    width: 100%;
    text-align: center;
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    padding: 10px 0 20px;
  }
`

const CartPopupBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const CartButton = styled.button`
    a {
      color: #fff;
    }
    align-items: center;
    display: flex;
    color: #fff;
    cursor: pointer;
    background: ${props => props.viewCart ? props.theme.primaryColor : props.theme.secondaryColor};
    font-size: 14px;
    border-radius: 4px;
    justify-content: center;
    height: 40px;
    width: 40%;
    transition: all 0.5s ease;
    border: none;
    outline: none;
    &:hover {
      a {
        color: ${props => props.theme.primaryColorV1};
      }
      color: ${props => props.theme.primaryColorV1};
      background: ${props => props.theme.primaryOnColor};
      border: 1px solid ${props => props.viewCart ? props.theme.primaryColor : props.theme.secondaryColor};
    }
`

const CartItemContainer = styled.ul`
    width: 100%;
    overflow-y: scroll;
    max-height: 60vh;
`

const StyledCartItem = styled.li`
    &:not(:last-child) {
      border-bottom: 1px solid #A9A9A9;
    }
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 20px;
    width: 100%;
    && img {
      height: 80px;
      width: 80px;
    }
    div > p {
      min-width: 140px;
      max-width: 140px;
      font-size: 12px;
    }
    div > span {
      color: #d60000;
      font-size: 13px;
    }
    button.delete {
      border-radius: 50%;
      border: none;
      cursor: pointer;
      margin-right: 10px;
      padding-left: 1px;
      padding-bottom: 1px;
      font-size: 12px;
      font-weight: bolder;
      height: 20px;
      width: 20px;
      transition: all 0.8s ease;
      vertical-align: center;
      text-align: center;
      outline: none;
      &:hover {
        color: ${props => props.theme.primaryOnColor};
        background: ${props => props.theme.secondaryColor};
      }
    }
`

const CartItem = (props) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState();
  const [showUpdateBtn, setShowUpdateBtn] = useState(false)
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)

  const {customerDto} = useSelector((state) => state.checkoutReducer.userData);
  const {item} = props;
  UseDidMountEffect(() => {
    if (quantity === props.item.quantity) {
      setShowUpdateBtn(false)
    } else {
      setShowUpdateBtn(true)
    }
  },[quantity])

  useEffect(() => {
    setQuantity(props.item.quantity)
  },[props.item.quantity])

  const handleItemQuantity = (operator) => {
    if (operator === 'add') {
      if(quantity === item.availableQuantity) {
        dispatch(enqueueSnackbar({
          message: `Max available quantity ${item.availableQuantity}!`,
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'warning',
          },
      }))
      return
      }
      setQuantity(quantity + 1)
    } else if (operator === 'subtract') {
      if(quantity <= 0) return
      setQuantity(quantity - 1)
    } else {
      return 
    }
  }
  
  const handleInputChange = (e) => {
    if(Number(e.target.value) > item.availableQuantity){
      dispatch(enqueueSnackbar({
        message: `Max available quantity ${item.availableQuantity}!`,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    return
    }
    if(e.target.value === '' || Number(e.target.value) >= 0) {
      setQuantity(Number(e.target.value))
    }
  }

  const handleUpdateCart = async () => {
    if(quantity < 1) {
      dispatch(enqueueSnackbar({
        message: 'Quantity should atleast be 1!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    } else {
      setLoading(true)
      if (customerDto) {
        try {
          const res = await axios.put('/api/cartLineItem/updatecart', [{...item, quantity: quantity, updatedBy: 1, customerId: 1}])
          if (res.status === 200 && res.data[0].cartLineItemUpdated === true) {
            setShowError(false)
            setShowUpdateBtn(false)
            dispatch(enqueueSnackbar({
              message: 'Item has been updated!',
              options: {
                  key: new Date().getTime() + Math.random(),
                  variant: 'success',
              },
          }))
          dispatch(asyncfetchCartState())
          }
          if (res.status === 200 && res.data[0].cartLineItemUpdated === false) {
            setShowError(true)
            dispatch(enqueueSnackbar({
              message: 'Check item quantity!',
              options: {
                  key: new Date().getTime() + Math.random(),
                  variant: 'warning',
              },
          }))
          }
  
        } catch (error) {
          console.log(error)
          dispatch(enqueueSnackbar({
            message: 'Item(s) not updated!',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error',
            },
        }))
        }
      } else {
        // props.updateCart([{...item, quantity: quantity, updatedBy: 1, customerId: 1}])
        localUpdateCart([{...item, quantity: quantity, updatedBy: 1, customerId: 1}])
        dispatch(enqueueSnackbar({
          message: 'Item has been updated!',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
          },
      }))
      dispatch(loadLocalCart())
      setShowUpdateBtn(false)
      }
      setLoading(false)
    }
  }

  const renderQuantity = () => {
    return (
      <QuantityInput onChange={(e) => handleInputChange(e)} type="text" value={quantity} />
    )
  }
  return (
    <StyledCartItem>
      <img src={item.imageUrl ? item.imageUrl : 'https://image.shutterstock.com/image-vector/photo-coming-soon-symbol-600w-161251868.jpg'} alt="product" />
      <div className="details">
        <p>{item.productName || item.name || 'Product Name here'}</p>
        <div css={`display:flex; align-items: center; margin-top: 5px;`}> 
          <div css={`display: flex; justify-content: flex-end; align-items: center; margin-right: 5px;`}>
            {renderQuantity()}
            <div css={`display: flex; flex-direction: column; margin-left: 5px;`}>
              <button onClick={() => handleItemQuantity('add')} css={`
                  background: #fff; 
                  border: 1px solid #A9A9A9; 
                  padding: 1px 4px;
                  cursor: pointer;
                  outline: none;
                  `}>+</button>
              <button onClick={() => handleItemQuantity('subtract')} css={`
                  background: #fff; 
                  border: 1px solid #A9A9A9; 
                  padding: 1px 4px;
                  cursor: pointer;
                  outline: none;`}>-</button>
            </div>
          </div> x {item.standardPrice}</div>
          {showUpdateBtn && <button onClick={handleUpdateCart} css={`
                    border: none; 
                    padding: 5px 8px; 
                    margin-top: 5px; 
                    background: ${loading ? 'grey' : '#fff'}; 
                    border: 1px solid #000;
                    display: flex;
                    align-items: center;
                    outline: none;
                    span {
                      margin: 0px 5px;
                    }
                    &:hover {
                      cursor: pointer;
                      pointer-events: ${loading ? 'none' : 'auto'};
                      background: ${loading ? 'grey' : '#000'};
                      color: ${loading ? '#A9A9A9' : '#fff'};
                      && svg {
                        color: ${loading ? '#A9A9A9!important' : '#fff!important'};
                      }
                    }
                    `}>{loading && <CircularProgress size={15} />}<span>Update</span></button>}
            {showError && <div css={`color: red; margin-top: 10px; font-size: ${props => props.theme.span};`}>{item.availableQuantity} in stock</div>}
      </div>
      <button className="delete" onClick={() => props.deleteItem({
        "id": item.id,
        "productId": item.productId,
        "quantity": item.quantity,
        "standardPrice": item.standardPrice,
        "customerId": 1,
        "updatedBy": 1,
        "insertedTimestamp": "2020-05-11 02:30:16"
      })}>x</button>
    </StyledCartItem>
  )
}

const CartPopup = (props) => {
  const {totalCartPrice, cartLineItems = []} = props;
  
  return (
    <>
      <StyledCartPopup showCart={props.showCart} className="popup" bottom={props.bottom}>
        {cartLineItems && cartLineItems.length === 0 ? 'You have no items in your cart.' : (
          <CartPopupContainer>
            <CartItemContainer>
              {cartLineItems && cartLineItems.map((item, index) => {
                  return (
                    <CartItem updateCart={(products) => props.updateCart(products)} item={item} key={index} deleteItem={(product) => props.deleteItem(product)}/>
                  )
                })}
            </CartItemContainer>
            <h3>Total: {totalCartPrice ? `$ ${parseFloat(+(Math.round(totalCartPrice + "e+2")  + "e-2"))}` : '$0'}</h3>
            <CartPopupBtnContainer>
              <Link href="/cart"><CartButton viewCart><a>View Cart</a></CartButton></Link>
              <Link href="/checkout"><CartButton><a>Checkout</a></CartButton></Link>
            </CartPopupBtnContainer>
          </CartPopupContainer>
        )}
      </StyledCartPopup>
      <span css={`
    display: ${props => props.showCart ? 'block' : 'none'};
    background: ${props => props.theme.primaryOnColor};
    position: absolute;
    transform: rotate(45deg);
    width: 20px;
    top: ${props.bottom ? '-30px' : props.small ? '72%' : '65%'};
    left: ${props.small ? '13%' : '35%'};
    height: 20px;
    z-index: 2;
      `}></span>
      </>
  )
}


// CART
const StyledCartContainer = styled.div`
  padding: ${props => props.small ? '0' : props.theme.sSize};
  color: ${props => props.cartColor ? props.cartColor : props.theme.primaryColor};
  position: relative;
  margin: ${props => props.margin ? '5px 10px' : 'auto'};
  div.itemCount {
    align-items: center;
    background: ${props => props.itemCountBackground ? props.itemCountBackground : props.theme.secondaryColor};
    border-radius: 50%;
    color: ${props => props.itemCountColor ? props.itemCountColor : props.theme.secondaryOnColor};
    display: flex;
    font-size: ${props => props.itemCountSize ? props.itemCountSize : props.theme.span};
    justify-content: center;
    left: 60%;
    padding: ${props => props.itemCountPadding ? props.itemCountPadding : props.theme.xsSize};
    position: absolute;
    width: ${props => props.small ? '15px' : '25px'};
    height: ${props => props.small ? '15px' : '25px'};
    top: ${props => props.small ? '0%' : '20%'};
  }
  svg {
    width: 30px;
    height: 30px;
    margin: 5px;
    & path {
      fill: ${props => props.theme.secondaryColor};
    }
  }
  .cart-container {
    display: flex;
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    &:hover {
      svg {
        color: ${props => props.bottom ? props.theme.secondaryOnColorV2 : props.theme.linkHoverColor};
      }
      /* div.popup {
        display: flex;
      } */
      span {
        display: block;
      }
    }
  }
`

export const Cart = (props) => {
  const dispatch = useDispatch()
  const [localCart, setLocalCart] = useState({
    cartLineItems: [],
    totalCartPrice: 0,
    totalCartQuantity: 0
  })
  const [showCart, setShowCart] = useState(false);
  const [timer, setTimer] = useState(null);


  // API DATA
  const totalCartQuantity = useSelector(state => state.cartReducer.cart.totalCartQuantity);
  const totalCartPrice = useSelector(state => state.cartReducer.cart.totalCartPrice);
  const cartLineItems = useSelector(state => state.cartReducer.cart.cartLineItemDtoList);
  const isAuthenticated = useSelector(state => !!state.authReducer.user);
  const {customerDto} = useSelector(state => state.checkoutReducer.userData)
  const loadLocalCartStore = useSelector(state => state.cartReducer.loadLocalCart);
  const addedToCart = useSelector(state => state.cartReducer.addToCartReqStatus);

   const deleteCartItem = (product) => {
    const confirm = window.confirm('Are you sure you want to remove the item?')
    if(confirm) {
      if (customerDto) {
        dispatch(asyncRemoveSelectedFromCart([product]))
      }else {
        localRemoveFromCart([product])
        dispatch(loadLocalCart())
      }
    } else {
      return
    }
  }

  useEffect(() => {
    if(isAuthenticated && cartLineItems.length === 0) {
      dispatch(asyncfetchCartState())
    }
  },[isAuthenticated])
  useEffect(() => {
    const savedLocalCart = loadSavedLocalCart()
    setLocalCart(savedLocalCart)
  },[loadLocalCartStore])

  useEffect(() => {
    if(addedToCart === ADD_TO_CART_SUCCESS) {
      setShowCart(true)
      const time = setTimeout(() => {
        setShowCart(false)
      }, 3000)
      setTimer(time)
    }
    () => {
      clearInterval(timer)
    }
  },[addedToCart, timer])
  return (
    <StyledCartContainer 
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      small={props.small} 
      margin={props.margin} 
      cartColor={props.cartColor} 
      bottom={props.bottom}>
      <div className="cart-container">
        {/* <LocalMallOutlinedIcon /> */}
        <CartWhiteIcon />
        <CartPopup
          showCart={showCart}
          small={props.small}
          bottom={props.bottom}
          deleteItem={(product) => deleteCartItem(product)}
          totalCartPrice={customerDto ? totalCartPrice : localCart.totalCartPrice}
          cartLineItems={customerDto ? cartLineItems : localCart.cartLineItems}
          updateCart={(products) => localUpdateCart(products)}
          />
      </div>
      <div className="itemCount">
        <span>{customerDto ? totalCartQuantity > 99 ? '+99' : totalCartQuantity : localCart.totalCartQuantity > 99 ? '+99' : localCart.totalCartQuantity}</span>
      </div>
    </StyledCartContainer>
  )
}

const SecondaryCartContainer = styled.div`
  border-radius: 50%;
  background: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  & img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  div.itemCount {
    align-items: center;
    cursor: pointer;
    background: ${props => props.itemCountBackground ? props.itemCountBackground : props.theme.secondaryColor};
    border-radius: 50%;
    color: ${props => props.itemCountColor ? props.itemCountColor : props.theme.secondaryOnColor};
    display: flex;
    font-size: 12px;
    justify-content: center;
    left: 45%;
    padding: ${props => props.itemCountPadding ? props.itemCountPadding : props.theme.xsSize};
    position: absolute;
    width: 23px;
    height: 23px;
    top: -3px;
  }
`

export const SecondaryCart = (props) => {
  const dispatch = useDispatch()
  const [localCart, setLocalCart] = useState({
    cartLineItems: [],
    totalCartPrice: 0,
    totalCartQuantity: 0
  })
  const [showCart, setShowCart] = useState(false);
  const [timer, setTimer] = useState(null);


  // API DATA
  const totalCartQuantity = useSelector(state => state.cartReducer.cart.totalCartQuantity);
  const totalCartPrice = useSelector(state => state.cartReducer.cart.totalCartPrice);
  const cartLineItems = useSelector(state => state.cartReducer.cart.cartLineItemDtoList);
  const {customerDto} = useSelector(state => state.checkoutReducer.userData)
  const loadLocalCartStore = useSelector(state => state.cartReducer.loadLocalCart);
  const addedToCart = useSelector(state => state.cartReducer.addToCartReqStatus);

  const deleteCartItem = (product) => {
    const confirm = window.confirm('Are you sure you want to remove the item?')
    if(confirm) {
      if (customerDto) {
        dispatch(asyncRemoveSelectedFromCart([product]))
      }else {
        localRemoveFromCart([product])
        dispatch(loadLocalCart())
      }
    } else {
      return
    }
  }

  useEffect(() => {
    const savedLocalCart = loadSavedLocalCart()
    setLocalCart(savedLocalCart)
  },[loadLocalCartStore])
  useEffect(() => {
    if(addedToCart === ADD_TO_CART_SUCCESS) {
      setShowCart(true)
      const time = setTimeout(() => {
        setShowCart(false)
      }, 3000)
      setTimer(time)
    }
    () => {
      clearInterval(timer)
    }
  },[addedToCart, timer])

  return (
    // <StyledSecondaryCartContainer
    //   onMouseEnter={() => setShowCart(true)}
    //   onMouseLeave={() => setShowCart(false)}
    //    itemCountPadding="10px">
    //   <div className="container">
    //     <div className="cart-container">
    //       <LocalMallOutlinedIcon />
    //       <CartPopup
    //         showCart={showCart}
    //         deleteItem={(product) => deleteCartItem(product)}
    //         totalCartPrice={customerDto ? totalCartPrice : localCart.totalCartPrice}
    //         cartLineItems={customerDto ? cartLineItems : localCart.cartLineItems}
    //         updateCart={(products) => localUpdateCart(products)}
    //         />
    //     </div>
    //     <div className="itemCount">
    //     {customerDto ? totalCartQuantity > 99 ? '+99' : totalCartQuantity : localCart.totalCartQuantity > 99 ? '+99' : localCart.totalCartQuantity}
    //     </div>
    //   </div>
    // </StyledSecondaryCartContainer>
    <SecondaryCartContainer
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      <CartPopup 
        showCart={showCart}
        deleteItem={(product) => deleteCartItem(product)}
        totalCartPrice={customerDto ? totalCartPrice : localCart.totalCartPrice}
        cartLineItems={customerDto ? cartLineItems : localCart.cartLineItems}
        updateCart={(products) => localUpdateCart(products)}
      />
      <img src="/cart-red.jpg" />
      <div className="itemCount">
        {customerDto ? totalCartQuantity > 99 ? '+99' : totalCartQuantity : localCart.totalCartQuantity > 99 ? '+99' : localCart.totalCartQuantity}
      </div>
    </SecondaryCartContainer>
  )
}