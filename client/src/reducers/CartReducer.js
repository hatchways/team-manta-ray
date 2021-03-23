import {
  ADD_TO_CART,
  DECREASE_COUNT,
  DELETE_FROM_CART,
  INCREASE_COUNT,
  RESET_CART,
} from "../constants/userConstants";

export const cartInitialState = {
  cart: [],
  chosenChef: null,
  chefConflictErr: null,
};

export const CartReducer = (state, action) => {
  const { type, payload } = action;
  console.log(type);
  console.log(payload);
  switch (type) {
    case ADD_TO_CART:
      const isSelectingFromADifferentChef =
        state.chosenChef && state.chosenChef !== payload.user;
      if (isSelectingFromADifferentChef) {
        return {
          ...state,
          chefConflictErr:
            "You have menu selected from another chef.If you want to change your chef clear your cart first.",
        };
      }
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
          chosenChef: payload.user,
          chefConflictErr: null,
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
        chosenChef: null,
        chefConflictErr: null,
      };
    default:
      return state;
  }
};
