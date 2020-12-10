import { LOGIN_USER, LOGOUT_USER, SET_VALID_AGE, SET_SHOW_LOGIN } from "../constants";

export const setValidAge = (validity) => ({
  type: SET_VALID_AGE,
  payload: validity
})

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const showLogin = (state) => ({
  type: SET_SHOW_LOGIN,
  payload: state
})