import update from 'immutability-helper';
import { LOGIN_USER, LOGOUT_USER, SET_VALID_AGE, SET_SHOW_LOGIN } from '../constants';

const initState = {
  user: null,
  validAge: false,
  showLogin: false
}

const setShowLogin = (state, action) => 
  update(state, {
    showLogin: {
      $set: action.payload
    }
  })

const setValidAge = (state, action) => 
  update(state, {
    validAge: {
      $set: action.payload
    }
  })

const loginUser = (state, action) =>
  update(state, {
    user: {
      $set: action.payload
    }
  })

const logoutUser = (state, action) =>
  update(state, {
    user: {
      $set: null
    }
  })

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SHOW_LOGIN:
      return setShowLogin(state, action);
    case SET_VALID_AGE:
      return setValidAge(state, action);
    case LOGIN_USER:
      return loginUser(state, action);  
    case LOGOUT_USER:
      return logoutUser(state, action);
    default:
      return state;
  }
}

export default authReducer;