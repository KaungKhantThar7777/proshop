import axios from "axios";
const {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAILURE,
} = require("../types");

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: ORDER_PAY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/my", config);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_LIST_MY_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};