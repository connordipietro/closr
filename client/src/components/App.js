import React from 'react';
import './App.css';
import Nav from './nav.js';
import CompaniesView from './companies-veiw.js';
import DealsView from './deals-view-dnd/deals-view'

function App() {
  return (
    <React.Fragment>
      <Nav /> 
      <CompaniesView />
      <DealsView />
    </React.Fragment>
  );
};

export default App;

//Companies/Deals can be placed in tabs eventually, both to be rendered on App for initial developement 