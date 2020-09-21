import { ACTION_TYPES } from "../Actions/actions";

export const products = (state = [], action) => {
  if (action.type === ACTION_TYPES.FETCH_ALL) {
    return action.payload;
  }
  return state;
};

export default products;
