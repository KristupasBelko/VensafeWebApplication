import { ACTION_TYPES } from "../Actions/actions";

const base64 = (state = "", action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE:
      return action.payload;
    default:
      return state;
  }
};

export default base64;
