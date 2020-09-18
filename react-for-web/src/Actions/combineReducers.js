import { combineReducers } from "redux";
import productReducer from "../Reducers/productsReducer";
import ticketReducer from "../Reducers/ticketReducer";

const allReducers = combineReducers({
  products: productReducer,
  base64: ticketReducer,
});

export default allReducers;
