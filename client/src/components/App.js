import React from 'react';
import './App.css';
import Nav from './nav/nav.js';
import DealsContainer from './deals/deals-container'
import DealView from './deals/deal-view/deal-view'
import CompaniesContainer from './companies/companies-container'
/* import {Tab, Tabs} from 'react-bootstrap'; */
import { Redirect, Route, Switch } from 'react-router';
import CompanyView from './companies/company-view';
import DashboardContainer from './dashboard/dashboard-container';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/companies/:_id" component={CompanyView}/>
        <Route path="/companies" component={CompaniesContainer}/>
        <Route path="/deals/:_id" component={DealView}/>
        <Route path="/deals" component={DealsContainer}/>
        <Route path="/dashboard" component={DashboardContainer}/>
        <Redirect to="/companies" />
      </Switch>
    </React.Fragment>
  );
};

export default App;

//Companies/Deals can be placed in tabs eventually, both to be rendered on App for initial developement 

/* <Tabs defaultActiveKey="companies" id="uncontrolled-tab-example">
<Tab eventKey="companies" title="Companies">
  <CompaniesContainer/>
</Tab>
<Tab eventKey="deals" title="Deals">
  <DealsContainer />
</Tab>
</Tabs> */