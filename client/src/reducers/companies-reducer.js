import { GET_COMPANIES } from "../actions";

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
    default:
      return state;
  };
};

export default CompaniesReducer;