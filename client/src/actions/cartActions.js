import axios from "axios";
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  RESET_CART,
  DECREASE_COUNT,
  INCREASE_COUNT,
  GET_CHOSEN_CHEF_PROFILE,
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

export const getChosenChefProfile = async (dispatch, chefProfileId) => {
  try {
    //write backend first
    const res = await axios.get(`/api/chefProfiles/chefId/${chefProfileId}`);
    dispatch({ type: GET_CHOSEN_CHEF_PROFILE, payload: res.data.chefProfile });
  } catch (err) {
    console.log(err);
  }
};

export const clearCart = (dispatch) => {
  dispatch({ type: RESET_CART });
};
