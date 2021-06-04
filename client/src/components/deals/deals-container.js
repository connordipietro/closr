import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AddDeal from './add-deal';
import DealsViewHandler from './deals-view-handler';
import './deals-view-style.css';
import DealFilters from '../filters/DealFilters'

function DealsContainer() {
  return (
    <>
    <div className='row'>
      <div className='col-sm-6 offset-md-4'>
        <DealFilters/>
      </div>
      <div className='col-sm-2'>
        <AddDeal />
      </div>
    </div>
      
      <Nav variant="tabs" defaultActiveKey="/deals">
        <LinkContainer to="/dashboard">
          <Nav.Item>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/companies">
          <Nav.Item>
            <Nav.Link href="/companies">Companies</Nav.Link>
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/deals">
          <Nav.Item>
            <Nav.Link href="/deals" disabled>
              Deals
            </Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
      <DealsViewHandler />
    </>
  );
}

export default DealsContainer;
