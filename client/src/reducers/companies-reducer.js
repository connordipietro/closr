import { GET_COMPANIES, NEW_COMPANY } from "../actions";

const DEFAULT_STATE = {
  companies: []
};

const CompaniesReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        companies: action.payload.data,
        }
      case NEW_COMPANY:
        return {
        companies: action.payload.data,
            }
    default:
      return state;
  };
};

export default CompaniesReducer;