import {ADD_TO_CART,
        REQUEST_RESET,
        FETCH_CART_ITEMS,
        REQUEST_START,
        FETCH_CART_ITEMS_RESET,
        SET_CART_STATE,
        ADD_TO_CART_START,
        ADD_TO_CART_RESET,
        REMOVE_SELECTED_FROM_CART_START,
        REMOVE_SELECTED_FROM_CART_RESET,
        REMOVE_SELECTED_FROM_CART,
        ADD_TO_CART_SUCCESS
      } from '../constants';
import update from 'immutability-helper';

const initState = {
  cart: {
    totalCartQuantity: 0,
    totalCartPrice: 0,
    cartLineItemDtoList: []
  },
  loadLocalCart: true,
  addToBulk: false,
  addedProducts: [],
  totalNoOfProductsInCart: 0,
  totalPriceOfCart: 0,
  fetchCartRequest: REQUEST_RESET,
  addToCartReqStatus: REQUEST_RESET,
  removeFromCartReqStatus: REQUEST_RESET,
  removeSelectedFromCartStatus: REQUEST_RESET
}

const loadLocalCart = (state, action) => {
  return update(state, {
    loadLocalCart: {
      $set: !state.loadLocalCart
    }
  })
}

// const addToCart = (state, action) => {
//   const index = state.addedProducts.findIndex((product) => {
//     return product.item.id === action.item.item.id
//   });
//   if (index === -1) {
//     return update(state, {
//       addedProducts: {
//         $push: [action.item]
//       },
//       totalNoOfProductsInCart: {
//         $set: state.totalNoOfProductsInCart + action.item.itemQuantity
//       },
//       totalPriceOfCart: {
//         $set: parseFloat(+(Math.round((state.totalPriceOfCart + (action.item.item.standardPrice * action.item.itemQuantity)) + "e+2")  + "e-2"))
//       }
//     })
//   } else {
//     return update(state, {
//       addedProducts: {
//         [index]: {itemQuantity: {$set: state.addedProducts[index].itemQuantity + action.item.itemQuantity}}
//       },
//       totalNoOfProductsInCart: {
//         $set: state.totalNoOfProductsInCart + action.item.itemQuantity
//       },
//       totalPriceOfCart: {
//         $set: parseFloat(+(Math.round((state.totalPriceOfCart + (action.item.item.standardPrice * action.item.itemQuantity)) + "e+2")  + "e-2"))
//       }
//     })
//   }
// }

const fetchCartState = (state, action) =>
  update(state, {
    fetchCartRequest: {
      $set: REQUEST_START
    }
  })

const fetchCartStateReset = (state, action) =>
update(state, {
  fetchCartRequest: {
    $set: REQUEST_RESET
  }
})

const setCartState = (state, action) =>
  update(state, {
    cart: {
      $set: action.payload
    }
  })

const startAddToCart = (state, action) =>
  update(state, {
    addToCartReqStatus: {
      $set: REQUEST_START
    }
  })

const successAddToCart = (state, action) => 
  update(state, {
    addToCartReqStatus: {
      $set: ADD_TO_CART_SUCCESS
    }
  })

const resetAddToCart = (state, action) =>
  update(state, {
    addToCartReqStatus: {
      $set: REQUEST_RESET
    }
  })

  const removeSelectedFromCartStart = (state, action) =>
    update(state, {
      removeSelectedFromCartStatus: {
        $set: REQUEST_START
      }
    })

  const removeSelectedFromCartReset = (state, action) =>
    update(state, {
      removeSelectedFromCartStatus: {
        $set: REQUEST_RESET
      }
    })

  const removeSelectedFromCart = (state, action) => {
    const indexes = []
    action.payload.forEach((product) => indexes.push(product.id))
    return update(state, {
      cart: {
        cartLineItemDtoList: arr => arr.filter(item => indexes.indexOf(item.id) === -1),
        // totalCartPrice: () => state.cart.totalCartPrice - (action.payload.reduce((acc, item) => acc + item.standardPrice), 0),
        totalCartQuantity: {
          $set: state.cart.totalCartQuantity - action.payload.reduce((acc, item) => {
            return acc + item.quantity
          }, 0)
        },
        totalCartPrice: {
          $set: parseFloat(+(Math.round((state.cart.totalCartPrice - (action.payload.reduce((acc, item) => {
            return item.quantity * item.standardPrice + acc
          }, 0))) + "e+2")  + "e-2"))
        }
      }
    })
  }

  const setBulk = (state, action) => 
    update(state, {
      addToBulk: {
        $set: action.payload
      }
    })

const cartReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_BULK':
      return setBulk(state, action);
    case 'LOAD_LOCAL_CART':
      return loadLocalCart(state, action)
    case REMOVE_SELECTED_FROM_CART:
      return removeSelectedFromCart(state, action)
    case REMOVE_SELECTED_FROM_CART_RESET:
      return removeSelectedFromCartReset(state, action)
    case REMOVE_SELECTED_FROM_CART_START:
      return removeSelectedFromCartStart(state, action)
    case ADD_TO_CART_RESET:
      return resetAddToCart(state, action)
    case ADD_TO_CART_SUCCESS:
      return successAddToCart(state, action);
    case ADD_TO_CART_START:
      return startAddToCart(state, action)
    case SET_CART_STATE:
      return setCartState(state, action)
    case FETCH_CART_ITEMS_RESET:
      return fetchCartStateReset(state, action)
    case FETCH_CART_ITEMS:
      return fetchCartState(state, action)
    case ADD_TO_CART:
      return addToCart(state, action)
    default:
      return state;
  }
}

export default cartReducer;