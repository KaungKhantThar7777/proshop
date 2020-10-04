import axios from "axios";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from "../types";

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};
