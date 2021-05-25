import React from 'react';
import './App.css';
import Nav from './nav/nav.js';
import DealsContainer from './deals/deals-container'
import CompaniesContainer from './companies/companies-container'

function App() {
  return (
    <React.Fragment>
      <Nav /> 
      <CompaniesContainer/>
      <DealsContainer />
    </React.Fragment>
  );
};

export default App;

//Companies/Deals can be placed in tabs eventually, both to be rendered on App for initial developement 