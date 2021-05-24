import { GET_COMPANIES } from "../actions";

const DEFAULT_STATE = {
  companies: []
};

const CompaniesReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        companies: action.payload.data,
        }
    default:
      return state;
  };
};

export default CompaniesReducer;