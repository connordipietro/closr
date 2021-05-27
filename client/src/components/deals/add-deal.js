import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewDeal } from '../../actions'

function AddDeal() {
  const dispatch = useDispatch();

  const defaultFormInfo = {
    name: '',
    owner: '',
    amount: '',
    company: '',
    stage: '',
    createdAt: Date(),
    expectedCloseDate: Date(),
    stageLastUpdatedAt: Date(),
    isActive: true
  }

  const [formInfo, setFormInfo] = useState(defaultFormInfo);
  const [show, setShow] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);

  const handleDealSubmit = () => {
    dispatch(postNewDeal(formInfo))
    setFormInfo(defaultFormInfo);
    setShow(false);
  }

  const getCompaniesList = async () => {
    let list = await axios.get("/companies/list");
    debugger;
    setCompaniesList(list.data);
  }

  useEffect(() => {
    getCompaniesList();
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormInfo(prevState => ({...prevState, [name]: newValue}));
  };

  const renderAddDealModal = () => {
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Create Deal
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Create Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDealSubmit}>
            <Form.Group>
              <Form.Label>Deal Name *</Form.Label>
              <Form.Control 
                required 
                type="text" 
                placeholder="Enter Deal Name"
                value={formInfo.name}
                name="name"
                onChange={handleChange} />
              <br />
              <Form.Label>Deal Owner</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Deal Owner"
                value={formInfo.owner}
                name="owner"
                onChange={handleChange} />
              <br />
              <Form.Label>Deal Amount *</Form.Label>
              <Form.Control 
                required 
                type="number" 
                placeholder="Enter Deal Amount"
                value={formInfo.amount}
                name="amount"
                onChange={handleChange} />
              <br />
              <Form.Label>Company</Form.Label>
              <Form.Control
                //only posts to database if you set company name to ObjectID of existing company (60abeb852c7e70296433454b)
                required
                type="string" 
                placeholder="Enter Company Name"
                value={formInfo.company}
                name="company"
                onChange={handleChange} />
              <br />
              <Form.Label>Created Date *</Form.Label>
              <Form.Control
                //all three dates below will all be same created date. Need to figure out a way to update based on user input
                type="date" 
                />
              <br />
              <Form.Label>Expected Close Date</Form.Label>
              <Form.Control 
                type="Date" 
                />
              <br />
              <Form.Label>Stage Last Updated *</Form.Label>
              <Form.Control 
                type="Date" 
                />
              <br />
              <Form.Check 
                type="checkbox"
                name="isActive"
                label="Is Active?"
                id="is-active-checkbox"
                onChange={handleChange}
                defaultChecked={formInfo.isActive}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleDealSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  };

  return (
    <div>
      {renderAddDealModal()}
    </div>
  );
};

export default AddDeal;