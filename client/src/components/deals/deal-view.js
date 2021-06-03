import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button} from 'react-bootstrap';
import _ from "lodash";
import axios from "axios";
import EditDeal from './edit-deal'
import DealTimeline from './deal-timeline'
import { Safe, SafeFill } from 'react-bootstrap-icons';
import ArchiveButton from "../buttons/archiveButton";
import Moment from 'react-moment';
import { editDeal } from "../../actions";
import DeleteButton from "../buttons/deleteButton";
import DealViewCard from "./deal-view-card";

const DealView = (props) => {
  const dealId = props.match.params._id;
  const [dealData, setDealData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios.get(`/deals/${dealId}`).then(returnedDeal => setDealData(returnedDeal.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteDeal = () => {
    // To-Do: Put in some way to ask if they are sure they want to delete the deal
    axios.delete(`/deals/${dealData._id}`).then(() => {history.push("/deals")})
  }
  const handleArchiveDeal = () => {
    // dispatch(editDeal(dealData._id, {archived: true}));
    axios.put(`/deals/${dealData._id}/update`, {archived: true}).then(updatedDeal => setDealData(updatedDeal.data))
  }

  if (_.isEmpty(dealData)){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <div className="text">
        <Link to="/deals" variant="primary"><Button className="btn-return">Return to all deals</Button></Link>
        <div className="center">
          <div className="col-md-4 p-2">
            <DealViewCard deal={dealData} handleArchiveDeal={handleArchiveDeal} handleDeleteDeal={handleDeleteDeal}></DealViewCard>
          </div>
          <div className="col-md-4 p-2">
            <div className="card" width="18rem">
              <div class="card-body">
                <h2 className="deals-title">Timeline</h2>
                <DealTimeline stageHistory={dealData.stageHistory}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealView;
