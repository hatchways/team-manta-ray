import axios from "axios";
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  RESET_CART,
  DECREASE_COUNT,
  INCREASE_COUNT,
} from "../constants/userConstants";

export const addToCart = async (dispatch, payload) => {
  dispatch({ type: ADD_TO_CART, payload });
};

export const removeFromCart = async (dispatch, payload) => {
  dispatch({ type: DELETE_FROM_CART, payload });
};

export const decreaseCount = async (dispatch, payload) => {
  dispatch({ type: DECREASE_COUNT, payload });
};

export const increaseCount = async (dispatch, payload) => {
  dispatch({ type: INCREASE_COUNT, payload });
};

export const getChefProfile = async (dispatch, chefUserId) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const clearCart = (dispatch) => {
  dispatch({ type: RESET_CART });
};
