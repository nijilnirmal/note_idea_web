import { createStore, applyMiddleware } from "redux";
import createRootReducer from "./rootReducer";
import { middleware as reduxPackMiddleware } from "redux-pack";

const initialState = {};

export default createStore(
  createRootReducer(),
  initialState,
  applyMiddleware(reduxPackMiddleware)
);
