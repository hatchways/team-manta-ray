import axios from "axios";
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  RESET_CART,
  DECREASE_COUNT,
  INCREASE_COUNT,
  GET_CHOSEN_CHEF_PROFILE,
  SET_CONFLICT_ERR,
  CLEAR_CONFLICT_ERR,
  SET_CART_ITEMS,
  SET_CHEF,
} from "../constants/userConstants";

export const getCartInfo = async (dispatch) => {
  try {
    const res = await axios.get("/api/users/cart");
    if (res.status === 200) {
      dispatch({ type: SET_CART_ITEMS, payload: res.data.cart.items });
      //-----------Temporary------- when we change the models and have only user model, we will not need this second call. I have it here because I need the name of the chef//
      const chefRes = await axios.get(
        `/api/chefProfiles/chefId/${res.data.cart.chef._id}`
      );
      dispatch({
        type: GET_CHOSEN_CHEF_PROFILE,
        payload: chefRes.data.chefProfile,
      });
      // dispatch({ type: SET_CHEF, payload: res.data.cart.chef });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (dispatch, payload) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      recipe: payload._id,
      chef: payload.user,
    });

    const res = await axios.put("/api/users/cart", body, config);
    if (res.status === 200) {
      dispatch({ type: ADD_TO_CART, payload: res.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (dispatch, recipeId) => {
  try {
    const res = await axios.delete(`/api/users/cart/${recipeId}`);
    if (res.status === 200) {
      dispatch({ type: DELETE_FROM_CART, payload: res.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const decreaseCount = async (dispatch, payload) => {
  const { id, chef, qty } = payload;
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      recipe: id,
      chef,
      qty,
    });
    const res = await axios.put("/api/users/cart", body, config);
    if (res.status === 200) {
      dispatch({ type: DECREASE_COUNT, payload: res.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const increaseCount = async (dispatch, payload) => {
  const { id, chef, qty } = payload;
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      recipe: id,
      chef,
      qty,
    });
    const res = await axios.put("/api/users/cart", body, config);
    if (res.status === 200) {
      dispatch({ type: INCREASE_COUNT, payload: res.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChosenChefProfile = async (dispatch, chefProfileId) => {
  try {
    const res = await axios.get(`/api/chefProfiles/chefId/${chefProfileId}`);
    dispatch({ type: GET_CHOSEN_CHEF_PROFILE, payload: res.data.chefProfile });
  } catch (err) {
    console.log(err);
  }
};

export const setChefConflictError = (dispatch) => {
  dispatch({ type: SET_CONFLICT_ERR });
  setTimeout(() => {
    dispatch({ type: CLEAR_CONFLICT_ERR });
  }, 6000);
};

export const clearCart = async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/cart`);
    if (res.status === 200) {
      dispatch({ type: RESET_CART });
    }
  } catch (err) {
    console.log(err);
  }
};
