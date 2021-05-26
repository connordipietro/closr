import React from 'react';
import AddDeal from './add-deal'
import DealsViewHandler from './deals-view-handler'

function DealsContainer() {
  console.log('deals-container')
  return (
    <React.Fragment>
      <DealsViewHandler />
      <AddDeal />
    </React.Fragment>
  );
};

export default DealsContainer;
