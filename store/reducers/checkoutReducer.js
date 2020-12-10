import update from 'immutability-helper';
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

const initState = {
  userData: {
    customerDto: null,
    customerStoreDtoList: []
  },
  selectedStoreId: '',
  selectedBillingAddressId: '',
  selectedShippingAddressId: '',
  newAddress: '',
  shippingInfo: '',
  shippingMeth: '',
  paymentInfo: '',
  completed: [],
  activeStep: 1,
}

const setUserData = (state, action) => {
  console.log(action)
  return update(state, {
    userData: {
      $set: action.payload
    }
  })
}

const setStoreId = (state, action) =>
  update(state, {
    selectedStoreId: {
      $set: action.payload
    }
  })

const setBillingAddressId = (state, action) =>
  update(state, {
    selectedBillingAddressId: {
      $set: action.payload
    }
  })

const setShippingAddressId = (state, action) =>
  update(state, {
    selectedShippingAddressId: {
      $set: action.payload
    }
  })

const setShippingInfo = (state, action) =>
  update(state, {
    shippingInfo: {
      $set: action.payload
    }
  })

  const setShippingMethod = (state, action) =>
  update(state, {
    shippingMeth: {
      $set: action.payload
    }
  })

  const setPaymentInfo = (state, action) => 
    update(state, {
      paymentInfo: {
        $set: action.payload
      }
    })

  const addToCompleted = (state, action) => {
   return  update(state, {
    completed: {
      $push: [action.payload]
    }
  })
  }

  const setActiveStep = (state, action) => 
    update(state, {
      activeStep: {
        $set: action.payload
      }
    })

  const setNewAddress = (state, action) =>
    update(state, {
      newAddress: {
        $set: action.payload
      }
    })

const checkoutReducer = (state = initState, action) => {
  switch(action.type) {
    case SET_BILLING_ADDRESS_ID:
      return setBillingAddressId(state, action);
    case SET_SHIPPING_ADDRESS_ID:
      return setShippingAddressId(state, action);
    case SET_STORE_ID:
      return setStoreId(state, action);
    case SET_NEW_ADDRESS:
      return setNewAddress(state, action);
    case SET_ACTIVE_STEP:
      return setActiveStep(state, action);
    case ADD_TO_COMPLETED:
      return addToCompleted(state, action);
    case SET_PAYMENT_INFO:
      return setPaymentInfo(state, action);
    case SET_SHIPPING_METHOD:
      return setShippingMethod(state, action);
    case SET_SHIPPING_INFO:
      return setShippingInfo(state, action);
    case SET_USER_DATA:
      return setUserData(state, action);
    default:
      return state;
  }
}

export default checkoutReducer;