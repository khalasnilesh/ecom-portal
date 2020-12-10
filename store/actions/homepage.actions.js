import { 
  FETCH_HOME_MENU,
  FETCH_HOME_MENU_SUCCESS,
  FETCH_HOME_MENU_RESET,
  FETCH_HOME_MENU_ERROR,
  SET_BUSINESS_TYPE,
  SET_SLIDER_LISTS
} from '../constants';

export const setBusinessType = (type) => ({
  type: SET_BUSINESS_TYPE,
  payload: type
})

export const setSliderLists = (data) => ({
  type: SET_SLIDER_LISTS,
  payload: data
})

export const fetchHomeMenu = () => ({
  type: FETCH_HOME_MENU
})

export const fetchHomeMenuSuccess = data => ({
  type: FETCH_HOME_MENU_SUCCESS,
  payload: {
    menuData: data.content
  }
});

export const fetchHomeMenuError = errMsg => ({
  type: FETCH_HOME_MENU_ERROR,
  payload: { msg: errMsg }
});

export const fetchHomeMenuReset = () => ({ type: FETCH_HOME_MENU_RESET });
