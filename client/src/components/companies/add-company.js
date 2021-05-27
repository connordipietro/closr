import { useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewCopmany } from '../../actions'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const companySchema = Yup.object().shape({
  name: Yup.string().required(),
  owner: Yup.string(),
  phone: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  industry: Yup.string()
})

function AddCompany() {
  const { reset, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(companySchema),
  });

  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);

  const handleCompanyAdd = (data) => {
    dispatch(postNewCopmany(data))
    reset()
    setShow(false);
  };

  const onClose = () => {
    setShow(false)
    reset()
  }

  const formFields = ['Name', 'Owner', 'Phone', 'City', 'State', 'Industry']

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
      {renderAddCompanyModal()}
    </div>
  );
};

export default AddCompany;