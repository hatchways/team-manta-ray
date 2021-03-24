import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BOOKING_DATE,
} from "../constants/cartConstants";
// export const login = async (dispatch, loginPayload) => {
export const saveShippingAddress = async (dispatch, data) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const saveBooking = async (dispatch, data) => {
  dispatch({
    type: CART_SAVE_BOOKING_DATE,
    payload: data,
  });

  localStorage.setItem("bookingDate", JSON.stringify(data));
};
