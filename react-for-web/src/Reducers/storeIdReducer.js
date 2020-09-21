import { ACTION_TYPES } from "../Actions/actions";

export const productsInCart = (state = "", action) => {
  if (action.type === ACTION_TYPES.STORE_ID) {
    return action.payload;
  }
  return state;
};

export default productsInCart;
