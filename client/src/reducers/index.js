import { combineReducers } from "redux";
import CompaniesReducer from "./companies-reducer";
import DealsReducer from "./deals-reducer";
import NewCompanyReducer from "./new-company-reducer";
import NewDealReducer from "./new-deal-reducer";

const rootReducer = combineReducers({
  companyData: CompaniesReducer,
  dealsData: DealsReducer,
  newCompany: NewCompanyReducer,
  newDeal: NewDealReducer
});

export default rootReducer;