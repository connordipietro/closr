import { combineReducers } from "redux";
import CompaniesReducer from "./companies-reducer";
import DealsReducer from "./deals-reducer";

const rootReducer = combineReducers({
  companyData: CompaniesReducer,
  dealsData: DealsReducer
});

export default rootReducer;