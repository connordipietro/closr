import { GET_COMPANY } from "../actions";

const DEFAULT_STATE = {
  company: [],
};

const CompanyReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANY:
      return {
        company: action.payload.data
        };
    default:
      return state;
  };
};

export default CompanyReducer;