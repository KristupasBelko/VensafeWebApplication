import { combineReducers } from "redux";
import productReducer from "./productsReducer";
import ticketReducer from "./ticketReducer";
import cartReducer from "./cartReducer";
import storeIdReducer from "./storeIdReducer";

const allReducers = combineReducers({
  products: productReducer,
  base64: ticketReducer,
  productsInCart: cartReducer,
  storeId: storeIdReducer,
});

export default allReducers;
