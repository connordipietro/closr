import { useState } from "react";
import {Modal, Button, Form} from 'react-bootstrap';

function AddCompany() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Company
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Name" />
              <br />
              <Form.Label>Owner</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Owner" />
              <br />
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Phone Number" />
              <br />
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter Company City" />
              <br />
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Select Company State" />
              <br />
              <Form.Label>Industry</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Indsutry" />
              <br />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCompany;
