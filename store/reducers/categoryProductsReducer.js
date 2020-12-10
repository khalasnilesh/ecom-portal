import update from 'immutability-helper';
import {
  REQUEST_RESET, 
  REQUEST_START, 
  REQUEST_SUCCESS, 
  REQUEST_ERROR,
  FETCH_CATEGORY_PRODUCTS,
  FETCH_CATEGORY_PRODUCTS_SUCCESS,
  FETCH_CATEGORY_PRODUCTS_ERROR,
  FETCH_CATEGORY_PRODUCTS_RESET,
  SET_ACTIVE_CATEGORY
} from '../constants';

const initState = {
  fetchCategoryProductsReqStatus: REQUEST_RESET,
  categoryProducts: [],
  activeCategory: {},
  totalCount: 0,
  isLoggedIn: true
}

const fetchCategoryProducts = (state, action) => 
  update(state, {
    fetchCategoryProductsReqStatus: {
      $set: REQUEST_START
    }
  })

const fetchCategoryProductsSuccess = (state, action) => {
  return update(state, {
    fetchCategoryProductsReqStatus: {
      $set: REQUEST_SUCCESS
    },
    categoryProducts: {
      $set: action.payload.categoryProducts
    },
    totalCount: {
      $set: action.payload.totalCount
    }
  });
};

const fetchCategoryProductsError = (state, action) =>
  update(state, {
    fetchCategoryProductsReqStatus: {
      $set: REQUEST_ERROR
    }
  });

const fetchCategoryProductsReset = (state, action) =>
  update(state, {
    fetchCategoryProductsReqStatus: {
      $set: REQUEST_RESET
    }
  });

const setActiveCategory = (state, action) =>
  update(state, {
    activeCategory: {
      $set: action.payload
    }
  })

const fetchMoreProductsSuccess = (state, action) =>
  update(state, {
    categoryProducts: {
      $push: action.payload.moreCategoryProducts
    }
  })

const categoryProductsReducer = (state = initState, action) => {
  switch(action.type) {
    case 'FETCH_MORE_PRODUCTS_SUCCESS':
      return fetchMoreProductsSuccess(state, action);
    case SET_ACTIVE_CATEGORY:
      return setActiveCategory(state, action);
    case FETCH_CATEGORY_PRODUCTS:
      return fetchCategoryProducts(state, action);
    case FETCH_CATEGORY_PRODUCTS_SUCCESS:
      return fetchCategoryProductsSuccess(state, action);
    case FETCH_CATEGORY_PRODUCTS_ERROR:
      return fetchCategoryProductsError(state, action);
    case FETCH_CATEGORY_PRODUCTS_RESET:
      return fetchCategoryProductsReset(state, action);
    default: 
      return state;
  }
}

export default categoryProductsReducer;