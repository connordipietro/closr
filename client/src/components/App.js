import React from 'react';
import './App.css';
import Nav from './nav.js';
import Companies from './companies-veiw.js';
import Deals from './deals-view';

function App() {
  return (
    <React.Fragment>
      <Nav /> 
      <Companies />
      <Deals />
    </React.Fragment>
  );
};

export default App;

//Companies/Deals can be placed in tabs eventually, both to be rendered on App for initial developement 