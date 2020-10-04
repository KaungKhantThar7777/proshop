import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE } from "../types";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};
