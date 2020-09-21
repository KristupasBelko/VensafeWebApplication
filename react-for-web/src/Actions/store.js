import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "../Reducers/combineReducers";

export const store = createStore(allReducers, compose(applyMiddleware(thunk)));
