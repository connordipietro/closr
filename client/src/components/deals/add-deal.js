import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewDeal } from '../../actions'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import CompanyMenu from './company-menu'
import * as Yup from 'yup';

const dealSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for the deal"),
  owner: Yup.string(),
  amount: Yup.number().required().typeError("Please enter a deal amount"),
  company: Yup.string().required("Please select a Company"),
})

function AddDeal() {
  const { reset, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(dealSchema),
  });

  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);

  const handleCompanyAdd = (data) => {
    dispatch(postNewDeal(data))
    reset()
    setShow(false);
  };

  const onClose = () => {
    setShow(false)
    reset()
  }

  const getCompaniesList = async () => {
    let list = await axios.get("/companies/list");
    debugger;
    setCompaniesList(list.data);
  }

  useEffect(() => {
    getCompaniesList();
  }, [])

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const newValue = type === "checkbox" ? checked : value;
  //   setFormInfo(prevState => ({...prevState, [name]: newValue}));
  // };
  const formFields = ['Name', 'Owner', 'Amount', 'Company']

  const renderAddDealModal = () => {
    return (
      <>
        <Button variant="primary" className="add-button" onClick={() => setShow(true)}>
          Add a Deal
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
            <Modal.Title>Add a new Deal</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(handleCompanyAdd)}>
            <Modal.Body>
              {formFields.map(field => {
                return (
                  <div key ={field}>
                    <div className="form-group" >
                      <label>{field}</label>
                      <input
                        className="form-control"
                        placeholder={`Enter Company ${field}`}
                        name={field.toLowerCase()}
                        {...register(field.toLowerCase())}
                      ></input>
                      {errors[field.toLowerCase()]?.message}
                    </div>
                    <br />
                  </div>
                )
              })} 
                <div key ="Company">
                  <div className="form-group" >
                    <label>Company</label>
                    <CompanyMenu companiesList={companiesList}/>
                  </div>
                  <br />
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>Close</Button>
              <Button type="submit" variant="primary">Submit</Button>
            </Modal.Footer>
          </form>
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