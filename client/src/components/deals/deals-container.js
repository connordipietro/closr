import React from 'react';
import AddDeal from './add-deal'
import DealsViewHandler from './deals-view-handler'
import {/* Tab, Tabs, */ Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './styles.css'

function DealsContainer() {
  return (
    <React.Fragment>
      <Nav variant="tabs" defaultActiveKey="/deals">
        <LinkContainer to="/companies">
          <Nav.Item>
            <Nav.Link href="/companies">Companies</Nav.Link>
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/deals">
          <Nav.Item>
            <Nav.Link href="/deals" disabled>Deals</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
      <DealsViewHandler />
      <div className="deals-button-container">
        <AddDeal />
      </div>
    </React.Fragment>
  );
};

export default DealsContainer;
