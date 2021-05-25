import { GET_COMPANIES, GET_COMPANY } from "../actions";

const DEFAULT_STATE = {
  companies: [],
  count: null
};

const CompaniesReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        companies: action.payload.data.companies,
        count: action.payload.data.totalResultsCount
        }
      case GET_COMPANY: //needs fixing
        return {
        company: action.payload.data,
            };
    default:
      return state;
  };
};

export default CompaniesReducer;