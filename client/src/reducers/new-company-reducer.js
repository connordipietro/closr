import { POST_COMPANY } from "../actions";

const DEFAULT_STATE = {
  newCompany: []
};

const NewCompanyReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
      case POST_COMPANY:
        return {
        newCompany: action.payload.data,
            }
    default:
      return state;
  };
};

export default NewCompanyReducer;