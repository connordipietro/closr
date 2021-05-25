import React from 'react';
import DealsView from './deals-view'
import AddDeal from './add-deal'

function DealsContainer() {
  return (
    <React.Fragment>
      <DealsView />
      <AddDeal />
    </React.Fragment>
  );
};

export default DealsContainer;
