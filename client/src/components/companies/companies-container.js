import React from 'react';
import CompaniesView from './companies-veiw'
import AddCompany from './add-company';


function CompaniesContainer() {
  console.log('hey')
  return (
    <React.Fragment>
      <CompaniesView />
      <AddCompany />
    </React.Fragment>
  );
};

export default CompaniesContainer;
