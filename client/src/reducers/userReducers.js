/**
 * @description User reducers file to handle state change on login, register and logout
 */

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

// check if user logged in
const userData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const initialState = {
  userInfo: "" || userData,
  loading: false,
  error: null,
};

// User login reducer
export const UserLoginReducer = (initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...initialState,
        userInfo: action.payload,
        loading: false,
      };
    case USER_LOGOUT:
      return {};

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return initialState;
  }
};

// User register reducer
export const UserRegisterReducer = (initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return initialState;
  }
};
