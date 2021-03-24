import {
  ADD_TO_CART,
  DECREASE_COUNT,
  DELETE_FROM_CART,
  INCREASE_COUNT,
  RESET_CART,
  GET_CHOSEN_CHEF_PROFILE,
  SET_CONFLICT_ERR,
  CLEAR_CONFLICT_ERR,
} from "../constants/userConstants";

export const cartInitialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  chosenChefProfile: localStorage.getItem("chosenChefProfile")
    ? JSON.parse(localStorage.getItem("chosenChefProfile"))
    : null,
  chefConflictErr: null,
};

export const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const itemExist = state.cart.find((item) => item._id === payload._id);
      if (itemExist) {
        const newCart = state.cart.map((item) =>
          item._id === payload._id ? { ...item, count: item.count + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
        return {
          ...state,
          cart: newCart,
        };
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ ...payload, count: 1 }, ...state.cart])
        );
        return {
          ...state,
          cart: [{ ...payload, count: 1 }, ...state.cart],
          chefConflictErr: null,
        };
      }
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
      const newCart = state.cart.map((item) =>
        item._id === payload ? { ...item, count: item.count + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
    case DECREASE_COUNT:
      const NewCart = state.cart.map((item) =>
        item._id === payload
          ? { ...item, count: item.count - 1 > 0 ? item.count - 1 : 0 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(NewCart));
      return {
        ...state,
        cart: NewCart,
      };
    case DELETE_FROM_CART:
      const filteredCart = state.cart.filter(
        (recipe) => recipe._id !== payload
      );
      if (filteredCart.length === 0) {
        localStorage.removeItem("cart");
        localStorage.removeItem("chosenChefProfile");
        return {
          ...state,
          cart: [],
          chosenChefProfile: null,
        };
      } else {
        localStorage.setItem("cart", JSON.stringify(filteredCart));

        return {
          ...state,
          cart: filteredCart,
        };
      }
    case GET_CHOSEN_CHEF_PROFILE:
      localStorage.setItem("chosenChefProfile", JSON.stringify(payload));

      return {
        ...state,
        chosenChefProfile: payload,
      };
    case RESET_CART:
      localStorage.removeItem("cart");
      localStorage.removeItem("chosenChefProfile");
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
