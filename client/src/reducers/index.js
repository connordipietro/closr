import { combineReducers } from "redux";
import CompaniesReducer from "./companies-reducer";
import DealsReducer from "./deals-reducer";
import NewCompanyReducer from "./new-company-reducer";
import CompanyReducer from "./company-reducer";
import NewDealReducer from "./new-deal-reducer"
import ListReducer from "./list-reducer";

const rootReducer = combineReducers({
  companyData: CompaniesReducer,
  dealsData: DealsReducer,
  newCompany: NewCompanyReducer,
  companyView: CompanyReducer,
  newDeal: NewDealReducer,
  companiesList: ListReducer
});

export default rootReducer;