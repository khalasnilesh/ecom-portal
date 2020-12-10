import {
  SET_USER_DATA,
  SET_BILLING_ADDRESS_ID,
  SET_SHIPPING_ADDRESS_ID,
  SET_STORE_ID,
  SET_SHIPPING_INFO,
  SET_SHIPPING_METHOD,
  SET_PAYMENT_INFO,
  ADD_TO_COMPLETED,
  SET_ACTIVE_STEP,
  SET_NEW_ADDRESS
} from '../constants';

export const addToCompleted = (id) => ({
  type: ADD_TO_COMPLETED,
  payload: id
})

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data
})

export const setStoreId = (id) => ({
  type: SET_STORE_ID,
  payload: id
})

export const setShippingAddressId = (id) => ({
  type: SET_SHIPPING_ADDRESS_ID,
  payload: id
})

export const setBillingAddressId = (id) => ({
  type: SET_BILLING_ADDRESS_ID,
  payload: id
})

export const setShippingInfo = (data) => ({
  type: SET_SHIPPING_INFO,
  payload: data
})

export const setShippingMethod = (data) => ({
  type: SET_SHIPPING_METHOD,
  payload: data
})

export const setPaymentInfo = (data) => ({
  type: SET_PAYMENT_INFO,
  payload: data
})

export const setActiveStep = (step) => {
  console.log('Hit', step)
  return {
    type: SET_ACTIVE_STEP,
    payload: step
  }
}

export const setNewAddress = (data) => ({
  type: SET_NEW_ADDRESS,
  payload: data
})
