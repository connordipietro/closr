import {Modal, Button} from 'react-bootstrap';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import { editDeal } from '../../actions'

const dealSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for the deal"),
  amount: Yup.number().typeError("Please enter a deal amount"),
  company: Yup.string()
})

function EditDeal(props) {
  const { deal } = props;
  const dispatch = useDispatch();
  const defaultValues = {...deal};
  const { reset, register, handleSubmit, control, formState: { errors }} = useForm({
    resolver: yupResolver(dealSchema),
    defaultValues: {expectedCloseDate: new Date(deal.expectedCloseDate)}
  });
  console.log(deal.expectedCloseDate);

  const [show, setShow] = useState(false);

  const handleDealEdit = (data) => {
    setShow(false);
    dispatch(editDeal(deal._id, data));
  };

  const onClose = () => {
    setShow(false);
    reset();
  }

  const formFields = ['Name', 'Amount'];

  return (
    <>
    <div className="edit-deal" onClick={() => setShow(true)}>{deal.name}</div>

    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Edit deal</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleDealEdit)}>
          <Modal.Body>
            {formFields.map(field => {
              return (
                <div key ={field}>
                  <div className="form-group" >
                    <label>{field}</label>
                    <input
                      className="form-control"
                      defaultValue={deal[field.toLowerCase()]}
                      name={field.toLowerCase()}
                      {...register(field.toLowerCase())}
                    ></input>
                    {errors[field.toLowerCase()]?.message}
                  </div>
                  <br />
                </div>
              )
            })}
            <div className="form-section">
              <label htmlFor="expectedCloseDate" className="form-label">Expected Close Date</label>
              <br />
              <Controller
                control={control}
                name="expectedCloseDate"
                defaultValue={deal.expectedCloseDate}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                  />
                )}
              />
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

export default EditDeal;
