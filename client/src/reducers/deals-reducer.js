import { GET_DEALS } from "../actions";

const DEFAULT_STATE = {
  deals: []
};

const DealsReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_DEALS:
      return {
        deals: action.payload.data,
        }
    default:
      return state;
  };
};

export default DealsReducer;