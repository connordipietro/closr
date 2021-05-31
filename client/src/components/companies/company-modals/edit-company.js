import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { editCompany } from '../../../actions'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { PencilSquare } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons';
import { companySchema } from './companyHelpers';

function EditCompany({ company, id }) {
  const { reset, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(companySchema),
  });

  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);

  const handleCompanyEdit = (data) => {
    dispatch(editCompany(data, id))
    setShow(false);
  };

  const onClose = () => {
    setShow(false)
    reset()
  }

  const formFields = ['Name', 'Owner', 'Phone', 'City', 'State', 'Industry', 'Logo', 'url']

  const renderEditCompanyModal = () => {
    return (
      <>
        <PencilSquare width={24} height={24} onClick={() => setShow(true)}/>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
            <Modal.Title>Edit Company</Modal.Title>
            <X onClick={onClose} />
          </Modal.Header>
          <form onSubmit={handleSubmit(handleCompanyEdit)}>
            <Modal.Body>
              {formFields.map(field => {
                return (
                  <div key ={field}>
                    <div className="form-group" >
                      <label>{field}</label>
                      <input
                        className="form-control"
                        defaultValue={company[field.toLowerCase()]}
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
              <Button type="submit" variant="primary">Submit</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  };

  return (
    <div>
      {renderEditCompanyModal()}
    </div>
  );
};

export default EditCompany;