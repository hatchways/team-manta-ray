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
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants";

// check if user logged in
const userData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const userInitialState = {
  userInfo: "" || userData,
  loading: false,
  error: null,
};

// User login reducer
export const UserLoginReducer = (initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...initialState,
        userInfo: action.payload,
        loading: false,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
        userInfo: null,
        loading: null,
        error: null,
      };

    case USER_LOGIN_FAIL:
      return {
        ...initialState,
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
        ...initialState,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };

    default:
      return initialState;
  }
};
export const UserUpdateReducer = (initialState, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        ...initialState,
        loading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case USER_UPDATE_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };

    case USER_UPDATE_RESET:
      return {};

    default:
      return initialState;
  }
};
