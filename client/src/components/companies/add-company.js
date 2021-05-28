import { useEffect, useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { postNewCopmany, resetNewCompany } from '../../actions'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useHistory } from "react-router";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const companySchema = Yup.object().shape({
  name: Yup.string().required("Please enter a Company Name"),
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
  const newCompany = useSelector(({newCompany}) => newCompany);
  const history = useHistory();
  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);

  const handleCompanyAdd = (data) => {
    dispatch(postNewCopmany(data))
    // reset()
    // setShow(false);
  };

  useEffect(() => {
    if(newCompany.isSuccessful) {
      debugger;
      history.push(`/companies/${newCompany.newCompanyId}`)
      dispatch(resetNewCompany())
    }
  }, [newCompany])

  const onClose = () => {
    setShow(false)
    reset()
  }

  const formFields = ['Name', 'Owner', 'Phone', 'City', 'State', 'Industry']

  const renderAddCompanyModal = () => {
    return (
      <>
        <Button variant="primary" className="add-button" onClick={() => setShow(true)}>
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