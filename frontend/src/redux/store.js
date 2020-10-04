import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";
import { productDetailsReducer } from "./reducers/productDetailsReducers";

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
const initialState = {};
const middlewares = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
