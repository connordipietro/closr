import { GET_COMPANIES, POST_COMPANY, GET_COMPANY } from "../actions";

const DEFAULT_STATE = {
  companies: [],
};

const CompaniesReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        companies: action.payload.data,
      };
    case POST_COMPANY:
      return {
        companies: action.payload.data,
      };
    case GET_COMPANY:
      return {
        company: action.payload.data,
      };
    default:
      return state;
  }
};

export default CompaniesReducer;
