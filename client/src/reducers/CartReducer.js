import {
  ADD_TO_CART,
  DECREASE_COUNT,
  DELETE_FROM_CART,
  INCREASE_COUNT,
  RESET_CART,
} from "../constants/userConstants";

export const cartInitialState = {
  cart: [],
};

export const CartReducer = (state, action) => {
  const { type, payload } = action;
  console.log(type);
  console.log(state.cart);
  switch (type) {
    case ADD_TO_CART:
      const itemExist = state.cart.find((item) => item._id === payload._id);
      if (itemExist) {
        const newCart = state.cart.map((item) =>
          item._id === payload._id ? { ...item, count: item.count + 1 } : item
        );
        return {
          ...state,
          cart: newCart,
        };
      } else {
        return {
          ...state,
          cart: [{ ...payload, count: 1 }, ...state.cart],
        };
      }
    case INCREASE_COUNT:
      const newCart = state.cart.map((item) =>
        item._id === payload ? { ...item, count: item.count + 1 } : item
      );
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
      return {
        ...state,
        cart: NewCart,
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((recipe) => recipe._id !== payload),
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
