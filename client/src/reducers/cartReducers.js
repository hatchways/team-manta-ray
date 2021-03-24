import { CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartInitialState = {
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
