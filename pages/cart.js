import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {UpdateButton} from '../lib/Themes/StyledComponents';
import ViewCartTable from '../components/ViewCart-table/ViewCartTable';
import CartSummaryPanel from '../components/CartSummaryPanel/CartSummaryPanel';
import Grid from "@material-ui/core/Grid";
import Link from 'next/link';
import { CONTENT_WIDTH } from "../lib/Themes/Mobile";
import styled from 'styled-components';
import {Axios} from '../utils';
import { REQUEST_RESET } from '../store/constants';
import { CircularProgress, Hidden } from '@material-ui/core';
import { motion } from 'framer-motion';
import { loadSavedLocalCart } from '../utils/localCart';

const SummaryContainer = styled.div`
  width: 100%;
  margin: auto;
  position: sticky;
  top: 80px;
  margin-bottom: 3%;
  @media only screen and (min-width: 960px) {
    width: 90%;
    padding: 0% 3%;
  }
`

const CheckoutButton = styled(UpdateButton)`
  a {
      color: #fff;
    }
  width: 100%!important;
  background: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.primaryOnColor};
  margin: 3% 0%;
  &:hover {
    background: ${props => props.theme.primaryOnColor};
    border: 1px solid ${props => props.theme.secondaryColor};
    color: ${props => props.theme.secondaryColor};
    a {
        color: ${props => props.theme.primaryColorV1};
      }
  }
`

const Cart = (props) => {
  const [clearCart, setClearCart] = useState(false)
  const [updateCart, setUpdateCart] = useState(false)
  const [loading, setLoading] = useState(false);
  const [localCart, setLocalCart] = useState({
    cartLineItems: [],
    totalCartPrice: 0,
    totalCartQuantity: 0
  })

  const numberOfItems = useSelector((state) => state.cartReducer.cart.totalCartQuantity)
  const reqStatus = useSelector((state) => state.cartReducer.fetchCartRequest)
  const loadLocalCartStore = useSelector(state => state.cartReducer.loadLocalCart);

  const {customerDto} = useSelector(state => state.checkoutReducer.userData)

  useEffect(() => {
    if(updateCart || clearCart) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  },[updateCart, clearCart])
  useEffect(() => {
    const savedLocalCart = loadSavedLocalCart()
    setLocalCart(savedLocalCart)
  },[loadLocalCartStore])

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <Grid container justify="center">
      <Grid item 
        xs={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XS} 
        sm={CONTENT_WIDTH.BODY_CONTENT_WIDTH_SM}
        md={CONTENT_WIDTH.BODY_CONTENT_WIDTH_MD}
        lg={CONTENT_WIDTH.BODY_CONTENT_WIDTH_LG}
        xl={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XL}
        >
          <Grid item xs={11}>
            <div css={`width: 100%; text-align: center; @media only screen and (min-width: 980px){text-align: unset;}`}>
              <h1 css={`margin: 3% 0%;`}>Shopping Cart</h1>
            </div>
          </Grid>
          <Grid container justify="center">
            {customerDto ? reqStatus === REQUEST_RESET && numberOfItems === 0 ?
            <Grid item xs={7}>
              <img src="/empty-cart.jpg" css={`width: 100%;`}/>
              <div css={`width: 100%; display: flex; @media only screen and (min-width: 600px) { }`}>
              <UpdateButton viewCart hoverColor="green"><Link href="/"><a><span>Go Shopping</span></a></Link></UpdateButton>
              </div>
            </Grid>
            :
            <>
            <Grid item xs={12} md={8}>
              <ViewCartTable updateCart={updateCart} setUpdateCartToFalse={() => setUpdateCart(false)} clearCart={clearCart} setClearCartToFalse={() => setClearCart(false)} />
              <div css={`width: 100%; display: flex; @media only screen and (min-width: 600px) { }`}>
                <UpdateButton Loading={loading} hoverColor="red" onClick={() => setClearCart(true)}>{loading && <CircularProgress size={20} />}<span>Remove Selected</span></UpdateButton>
                <UpdateButton viewCart hoverColor="green"><Link href="/"><a><span>Go Shopping</span></a></Link></UpdateButton>
                <UpdateButton Loading={loading} viewCart onClick={() => setUpdateCart(true)}>{loading && <CircularProgress size={20} />}<span>Update Cart</span></UpdateButton>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryContainer>
                <CartSummaryPanel />
                <CheckoutButton><Link href="/checkout"><a>Proceed To Checkout</a></Link></CheckoutButton>
              </SummaryContainer>
            </Grid>
            </>
            :
            localCart.cartLineItems.length === 0 ?
            <Grid item xs={7}>
              <img src="/empty-cart.jpg" css={`width: 100%;`}/>
              <div css={`width: 100%; display: flex; @media only screen and (min-width: 600px) { }`}>
              <UpdateButton viewCart hoverColor="green"><Link href="/"><a><span>Go Shopping</span></a></Link></UpdateButton>
              </div>
            </Grid>
            :
            <>
            <Grid item xs={12} md={8}>
              <ViewCartTable updateCart={updateCart} setUpdateCartToFalse={() => setUpdateCart(false)} clearCart={clearCart} setClearCartToFalse={() => setClearCart(false)} />
              <div css={`width: 100%; display: flex; @media only screen and (min-width: 600px) { }`}>
                <UpdateButton Loading={loading} hoverColor="red" onClick={() => setClearCart(true)}>{loading && <CircularProgress size={20} />}<span>Remove Selected</span></UpdateButton>
                <UpdateButton viewCart hoverColor="green"><Link href="/"><a><span>Go Shopping</span></a></Link></UpdateButton>
                <UpdateButton Loading={loading} viewCart onClick={() => setUpdateCart(true)}>{loading && <CircularProgress size={20} />}<span>Update Cart</span></UpdateButton>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryContainer>
                <CartSummaryPanel />
                <CheckoutButton><Link href="/checkout"><a>Proceed To Checkout</a></Link></CheckoutButton>
              </SummaryContainer>
            </Grid>
            </>}
          </Grid>
        </Grid>
    </Grid>
    </motion.div>
  )
}

export async function getStaticProps () {
  return { props : {}}
}

export default Cart;