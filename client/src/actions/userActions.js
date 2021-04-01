/**
 * @description User actions for login , signup (register) and logout
 */

import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  RESET_RECIPES,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
} from "../constants/userConstants";

// User login action
export const login = async (dispatch, loginPayload) => {
  const { email, password } = loginPayload;

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // save data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));

    return JSON.stringify(data);
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

// Register User Action
export const register = async (dispatch, registerPayload) => {
  const { name, email, password, isChef } = registerPayload;
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // data from backend server
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password, isChef },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // save data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

// update user
export const updateUser = async (dispatch, payload) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const { values, profilePictureUrl } = payload;

    const { data } = await axios.put(`/api/users`, {
      ...values,
      profilePictureUrl,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.updatedUser,
    });

    const userData = {
      name: data.updatedUser.name,
      email: data.updatedUser.email,
      isChef: data.updatedUser.isChef,
      _id: data.updatedUser._id,
      address: data.updatedUser.address,
      location: data.updatedUser.location,
    };

    localStorage.setItem("userInfo", JSON.stringify(userData));
    return data.updatedUser;
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

// update user password
export const updatePassword = async (dispatch, passwordPayload) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
    });

    const { userId, oldPassword, password } = passwordPayload;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/users/update",
      { userId, oldPassword, password },
      config
    );

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });

    return data;
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

// User logout action
export const logout = async (dispatch) => {
  const res = await axios.get("/api/users/logout");
  if (res.status === 200) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("bookingDetails");
    dispatch({
      type: USER_LOGOUT,
    });

    dispatch({
      type: RESET_RECIPES,
    });
  }
};
