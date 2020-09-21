import { ACTION_TYPES } from "../Actions/actions";

const base64 = (state = "", action) => {
  if (action.type === ACTION_TYPES.CREATE_TICKET) {
    return action.payload;
  }
  return state;
};

export default base64;
