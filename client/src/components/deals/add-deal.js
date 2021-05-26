import { useState } from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDeals } from '../../actions'

function AddDeal() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()

  const handleClose = () => {
    setShow(false);
    dispatch(getDeals())
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Deal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Deal Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Deal Name" />
              <br />
              <Form.Label>Deal Stage</Form.Label>
              <Form.Control as="select">
                <option>Initiated</option>
                <option>Qualified</option>
                <option>Contract Sent</option>
                <option>Closed Won</option>
                <option>Closed Lost</option>
              </Form.Control>
              <br />
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" placeholder="Enter Deal Amount" />
              <br />
              <Form.Label>Close Date</Form.Label>
              <Form.Control type="date"/>
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

export default AddDeal;
