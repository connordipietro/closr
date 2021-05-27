import { useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewCompany } from '../../actions'

function AddCompany() {
  const dispatch = useDispatch();

  const defaultFormInfo = {
    name: '',
    owner: '',
    phone: '',
    city: '',
    state: '',
    industry: '',
    createdAt: Date()
  }

  const [formInfo, setFormInfo] = useState(defaultFormInfo);
  const [show, setShow] = useState(false);

  const handleCompanyAdd = () => {
    dispatch(postNewCompany(formInfo))
    setFormInfo(defaultFormInfo);
    setShow(false);
    //dispatch getCompanies but maintain page num?
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo(prevState => ({...prevState, [name]: value}));
  };

  const renderAddCompanyModal = () => {
    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          Add a Company
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
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
                  value={formInfo.name}
                  name="name"
                  onChange={handleChange}
                ></input>
              </div>
              <br />
              <div className="form-group">
                <label>Owner</label>
                <input
                  className="form-control"
                  placeholder="Enter Company Owner" 
                  value={formInfo.owner}
                  name="owner"
                  onChange={handleChange}
                ></input>
              </div>
              <br />
              <div className="form-group">
                <label>Phone</label>
                <input
                  className="form-control"
                  placeholder="Enter Company Phone Number" 
                  value={formInfo.phone}
                  name="phone"
                  onChange={handleChange} 
                ></input>
              </div>
              <br />
              <div className="form-group">
                <label>City</label>
                  <input
                    className="form-control"
                    placeholder="Enter Company City" 
                    value={formInfo.city}
                    name="city"
                    onChange={handleChange} 
                  ></input>
              </div>
              <br />
              <div className="form-group">
                <label>State</label>
                <input
                  className="form-control"
                  placeholder="Enter Company State" 
                  value={formInfo.state}
                  name="state"
                  onChange={handleChange} 
                ></input>
              </div>
              <br />
              <div className="form-group">
                <label>Industry</label>
                <input
                  className="form-control"
                  placeholder="Enter Company Industy" 
                  value={formInfo.industry}
                  name="industry"
                  onChange={handleChange} 
                ></input>
              </div>
              <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleCompanyAdd}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      {renderAddCompanyModal()}
    </div>
  );
};

export default AddCompany;