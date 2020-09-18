import { ACTION_TYPES } from "../Actions/actions";

const products = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        loading: false,
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default products;
