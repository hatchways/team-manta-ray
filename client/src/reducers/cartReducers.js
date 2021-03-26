import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BOOKING_DATE,
} from "../constants/cartConstants";

export const cartInitialState = {
  shippingAddress: "",
  bookingDetails: "",
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_BOOKING_DATE:
      console.log("payload:", action.payload);
      return {
        ...state,
        bookingDetails: action.payload,
      };

    default:
      return state;
  }
};
