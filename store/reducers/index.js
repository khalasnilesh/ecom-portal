import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import categoryProductsReducer from './categoryProductsReducer';
import paginationReducer from './paginationReducer';
import notificationReducer from './notificationReducer';
import checkoutReducer from './checkoutReducer';
import authReducer from './authReducer';
import homepageReducer from './homepageReducer';

export const rootReducer = combineReducers({authReducer, homepageReducer, checkoutReducer, cartReducer, categoryProductsReducer, paginationReducer, notificationReducer})