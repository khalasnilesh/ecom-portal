import { 
  FETCH_CATEGORY_PRODUCTS, 
  FETCH_CATEGORY_PRODUCTS_SUCCESS, 
  FETCH_CATEGORY_PRODUCTS_ERROR, 
  FETCH_CATEGORY_PRODUCTS_RESET,
  SET_ACTIVE_CATEGORY
} from "../constants";
import * as cartActions from './cart.action';

export default {cartActions}

export const setActiveCategory = (data) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: {
      id: data.id,
      name: data.name
    }
  }
};

export const fetchCategoryProducts = () => ({ type: FETCH_CATEGORY_PRODUCTS });

export const fetchCategoryProductsSuccess = data => ({
  type: FETCH_CATEGORY_PRODUCTS_SUCCESS,
  payload: {
    categoryProducts: data.content,
    totalCount: data.totalElements
  }
});

export const fetchCategoryProductsError = errMsg => ({
  type: FETCH_CATEGORY_PRODUCTS_ERROR,
  payload: { msg: errMsg }
});

export const fetchCategoryProductsReset = () => ({ type: FETCH_CATEGORY_PRODUCTS_RESET });

export const fetchMoreProductsSuccess = (data) => ({
  type: 'FETCH_MORE_PRODUCTS_SUCCESS',
  payload: {
    moreCategoryProducts: data.content
  }
})