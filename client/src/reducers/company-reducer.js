import { GET_COMPANY, GET_COMPANY_ERROR } from "../actions";

const DEFAULT_STATE = {
  company: [],
  error: '',
};

const CompanyReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANY:
      return {
        company: action.payload.data
        };
    case GET_COMPANY_ERROR:
      return {
        error: action.payload.message
        };
    default:
      return state;
  };
};

export default CompanyReducer;