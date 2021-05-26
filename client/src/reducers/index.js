import { combineReducers } from "redux";
import CompaniesReducer from "./companies-reducer";
import DealsReducer from "./deals-reducer";
import NewCompanyReducer from "./new-company-reducer";

const rootReducer = combineReducers({
  companyData: CompaniesReducer,
  dealsData: DealsReducer,
  newCompany: NewCompanyReducer,
});

export default rootReducer;