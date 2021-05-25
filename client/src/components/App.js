import React from 'react';
import './App.css';
import Nav from './nav/nav.js';
import DealsContainer from './deals/deals-container'
import CompaniesContainer from './companies/companies-container'
import {Tab, Tabs} from 'react-bootstrap';


function App() {
  return (
    <React.Fragment>
      <Nav />
        <Tabs defaultActiveKey="companies" id="uncontrolled-tab-example">
          <Tab eventKey="companies" title="Companies">
            <CompaniesContainer/>
          </Tab>
          <Tab eventKey="deals" title="Deals">
            <DealsContainer />
          </Tab>
        </Tabs>
    </React.Fragment>
  );
};

export default App;

//Companies/Deals can be placed in tabs eventually, both to be rendered on App for initial developement 