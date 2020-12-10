import {ADD_TO_CART,
        REMOVE_FROM_CART,
        FETCH_CART_ITEMS,
        FETCH_CART_ITEMS_RESET,
        SET_CART_STATE,
        ADD_TO_CART_START,
        ADD_TO_CART_RESET,
        REMOVE_SELECTED_FROM_CART_START,
        REMOVE_SELECTED_FROM_CART_RESET,
        REMOVE_SELECTED_FROM_CART,
        ADD_TO_CART_SUCCESS
      } from '../constants';

export const setBulk = (data) => ({
  type: 'SET_BULK',
  payload: data
})

export const loadLocalCart = () => ({
  type: 'LOAD_LOCAL_CART'
})

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product
})

export const fetchCartState = () => ({
  type: FETCH_CART_ITEMS
})

export const fetchCartStateReset = () => ({
  type: FETCH_CART_ITEMS_RESET
})

export const setCartState = (newState) => {
  return {
    type: SET_CART_STATE,
    payload: newState
  }
}

export const startAddToCart = () => ({
  type: ADD_TO_CART_START
})

export const successAddToCart = () => ({
  type: ADD_TO_CART_SUCCESS
})

export const resetAddToCart = () => ({
  type: ADD_TO_CART_RESET
})

export const removeSelectedFromCartStart = () => ({
  type: REMOVE_SELECTED_FROM_CART_START
})

export const removeSelectedFromCartReset = () => ({
  type: REMOVE_SELECTED_FROM_CART_RESET
})

export const removeSelectedFromCart = (selected) => ({
  type: REMOVE_SELECTED_FROM_CART,
  payload: selected
})