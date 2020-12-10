import React from 'react'
import { StyledGreenButton } from '../../../lib/Themes/StyledComponents'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { CircularProgress, Hidden } from '@material-ui/core';
import { CartWhiteIcon } from '../../../lib/Themes/icons';
import styled from 'styled-components';

const AddToCartButton = styled.button`
  align-items: center;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.secondaryColor};
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: ${props => props.theme.primaryOnColor};
  cursor: pointer;
  font-size: 16px;
  padding: 15px;
  width: 90%;
  height: 50px;
  text-transform: uppercase;
  span {
    margin-left: 10px;
  }
  @media only screen and (min-width: 960px) {
    width: 30%;
    font-size: 12px;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 150px;
    font-size: 16px;
    text-transform: unset;
  }
`


const AddToCartOptions = ({Loading, disabledIfNotInStock, addToCart, totalCartPrice, itemQuantity, itemSubtotal}) => {
  return (
    <div css={`
        width: 100%;
        background: #fff;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* height: 100px; */
        @media only screen and (min-width: 960px) {
          flex-direction: row;
          justify-content: space-between;
        }
      `}>
        <AddToCartButton disabled={disabledIfNotInStock}  onClick={() => addToCart()}>
          {Loading ? <CircularProgress size={20} style={{color: '#fff'}} /> : <CartWhiteIcon />}
          <span>Add To Cart</span>
        </AddToCartButton>
        <div
          css={`
            display: flex;
            align-items: center;
            width: 100%;
            & div.left, & div.right {
              width: 100%;
              height: 150px;
              padding: 10px 0px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            & div.details {
              align-items: center;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 50px;
              margin: 0px 10px;
              font-size: 14px;
              color: ${props => props.theme.primaryColor};
              & span.value {
                color: ${props => props.theme.secondaryColor};
                font-size: 18px;
              }
            }
            & div.seperator {
              width: 1px;
              margin: 5px 10px;
              border-right: 1px solid ${props => props.theme.primaryColorV2};
              height: 30px;
            }
            @media screen and (min-width: 960px) {
              width: 65%;
              justify-content: space-between;
              & div.details {
                font-size: 10px;
                margin: 0px 5px;
                & span.value {
                  font-size: 12px;
                }
              }
            }
            @media screen and (min-width: 1280px) {
              width: 70%;
              & div.details {
                font-size: 13px;
                margin: 0px 10px;
                & span.value {
                  font-size: 17px;
                }
              }
            }
          `}
        >
          <Hidden mdUp>
            <div className="left">
              <div className="details">
                <span>Quantity</span>
                <span className="value">{itemQuantity}</span>
              </div>
              <div className="details">
                <span>Current Cart</span>
                <span className="value">${totalCartPrice}</span>
              </div>
            </div>
            <div className="right">
              <div className="details">
                <span>Subtotal</span>
                <span className="value">${itemSubtotal}</span>
              </div>
              <div className="details">
                <span>Estimated Cart</span>
                <span className="value">${parseFloat(+(Math.round((totalCartPrice + itemSubtotal) + "e+2")  + "e-2"))}</span>
              </div>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="details">
              <span>Quantity</span>
              <span className="value">{itemQuantity}</span>
            </div>
            <div className="seperator"></div>
            <div className="details">
              <span>Subtotal</span>
              <span className="value">${itemSubtotal}</span>
            </div>
            <div className="seperator"></div>
            <div className="details">
              <span>Current Cart</span>
              <span className="value">${totalCartPrice}</span>
            </div>
            <div className="seperator"></div>
            <div className="details">
              <span>Estimated Cart</span>
              <span className="value">${parseFloat(+(Math.round((totalCartPrice + itemSubtotal) + "e+2")  + "e-2"))}</span>
            </div>
          </Hidden>
        </div>
        {/* <AddToCartButton disabled={disabledIfNotInStock}  onClick={() => addToCart()}>
          {Loading ? <CircularProgress size={20} style={{color: '#fff'}} /> : <CartWhiteIcon />}
          <span>Add To Cart</span>
        </AddToCartButton>
        <div
          css={`
            display: flex;
            align-items: center;
            & div {
              align-items: center;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 50px;
              margin: 0px 10px;
              font-size: 14px;
              color: ${props => props.theme.primaryColor};
              & span.value {
                color: ${props => props.theme.secondaryColor};
                font-size: 18px;
              }
            }
            & div.seperator {
              width: 1px;
              margin: 5px 10px;
              border-right: 1px solid ${props => props.theme.primaryColorV2};
              height: 30px;
            }
          `}
        >
          <div>
            <span>Quantity</span>
            <span className="value">{itemQuantity}</span>
          </div>
          <div className="seperator"></div>
          <div>
            <span>Subtotal</span>
            <span className="value">${itemSubtotal}</span>
          </div>
          <div className="seperator"></div>
          <div>
            <span>Current Cart</span>
            <span className="value">${totalCartPrice}</span>
          </div>
          <div className="seperator"></div>
          <div>
            <span>Estimated Cart</span>
            <span className="value">${parseFloat(+(Math.round((totalCartPrice + itemSubtotal) + "e+2")  + "e-2"))}</span>
          </div>
        </div> */}
      </div>
  )
}

export default AddToCartOptions
