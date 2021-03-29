import {
  ADD_TO_CART,
  DECREASE_COUNT,
  DELETE_FROM_CART,
  INCREASE_COUNT,
  RESET_CART,
  GET_CHOSEN_CHEF_PROFILE,
  SET_CONFLICT_ERR,
  CLEAR_CONFLICT_ERR,
  SET_CART_ITEMS,
  SET_CHEF,
} from "../constants/userConstants";

export const cartInitialState = {
  cart: [],
  chosenChefProfile: null,
  chefConflictErr: null,
};

export const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        cart: payload,
      };
    case SET_CHEF:
      return {
        ...state,
        chosenChefProfile: payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: payload,
      };

    case SET_CONFLICT_ERR:
      return {
        ...state,
        chefConflictErr:
          "You have menu selected from another chef.If you want to change your chef clear your cart first.",
      };
    case CLEAR_CONFLICT_ERR:
      return {
        ...state,
        chefConflictErr: null,
      };
    case INCREASE_COUNT:
      return {
        ...state,
        cart: payload,
      };
    case DECREASE_COUNT:
      return {
        ...state,
        cart: payload,
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: payload,
      };
    case GET_CHOSEN_CHEF_PROFILE:
      return {
        ...state,
        chosenChefProfile: payload,
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
        chosenChef: null,
        chefConflictErr: null,
      };
    default:
      return state;
  }
};
