import { useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewCopmany } from '../../actions'

function AddCompany() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [deals, setDeals] = useState([]);
  const [createdAt, setCreatedAt] = useState(Date);
  const [industry, setIndustry] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleCompanyAdd = (e) => {
    e.preventDefault();

      dispatch(
        postNewCopmany({
          name,
          owner,
          phone,
          city,
          state,
          deals,
          createdAt,
          industry
        })
      )
      setShow(false);
    }

  function renderAddCompanyModal() {
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a Company
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="form-group">
            <label>Name</label>
            <input
              required
              className="form-control"
              placeholder="Enter Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
            ></input>
          </div>
          <br />
          <div className="form-group">
            <label>Owner</label>
            <input
              className="form-control"
              placeholder="Enter Company Owner" 
              value={owner}
              onChange={(e) => setOwner(e.target.value)} 
            ></input>
          </div>
          <br />

          <div className="form-group">
            <label>Phone</label>
            <input
              className="form-control"
              placeholder="Enter Company Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
            ></input>
          </div>
          <br />

          <div className="form-group">
            <label>City</label>
            <input
              className="form-control"
              placeholder="Enter Company City" 
              value={city}
              onChange={(e) => setCity(e.target.value)} 
            ></input>
          </div>
          <br />

          <div className="form-group">
            <label>State</label>
            <input
              className="form-control"
              placeholder="Enter Company State" 
              value={state}
              onChange={(e) => setState(e.target.value)} 
            ></input>
          </div>
          <br />

          <div className="form-group">
            <label>Deals</label>
            <input
              className="form-control"
              placeholder="Enter Company Deals" 
              value={deals}
              onChange={(e) => setDeals(e.target.value)} 
            ></input>
          </div>
          <br />

          <div className="form-group">
            <label>Created Date</label>
            <input
              className="form-control"
              placeholder="Enter Company Created Date" 
              value={Date}
              onChange={(e) => setCreatedAt(e.target.value)} 
            ></input>
          </div>
          <br />

          <div className="form-group">
            <label>Industry</label>
            <input
              className="form-control"
              placeholder="Enter Company Industy" 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)} 
            ></input>
          </div>
          <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCompanyAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  }
  return (
    <div>
      {renderAddCompanyModal()}
    </div>
  )
}

export default AddCompany;