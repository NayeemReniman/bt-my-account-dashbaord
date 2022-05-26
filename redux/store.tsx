import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import main from "./reducers/main";

const middleware = [thunk];

const makeStore = () =>
  createStore(main, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);
