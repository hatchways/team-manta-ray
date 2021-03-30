import axios from "axios";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants";
import { RESET_CART } from "../constants/userConstants";

export const createOrder = async (dispatch, order) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: RESET_CART,
    });

    /**Remove cart items from localstorage */

    return JSON.stringify(data);
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};
