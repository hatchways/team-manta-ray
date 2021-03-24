import { CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
// export const login = async (dispatch, loginPayload) => {
export const saveShippingAddress = async (dispatch, data) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
