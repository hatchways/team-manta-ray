import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BOOKING_DATE,
} from "../constants/cartConstants";

export const cartInitialState = {
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},

  bookingDate: localStorage.getItem("bookingDate")
    ? JSON.parse(localStorage.getItem("bookingDate"))
    : {},
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_BOOKING_DATE:
      return {
        ...state,
        bookingDate: action.payload,
      };

    default:
      return state;
  }
};
