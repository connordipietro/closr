import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
import _ from "lodash";
import axios from "axios";
import EditDeal from './edit-deal'
import DealTimeline from './deal-timeline'
import { Safe, SafeFill } from 'react-bootstrap-icons';
import ArchiveButton from "../buttons/archiveButton";
import Moment from 'react-moment';

const DealView = (props) => {
  const dealId = props.match.params._id;
  const [dealData, setDealData] = useState({})


  useEffect(() => {
    axios.get(`/deals/${dealId}`).then(returnedDeal => setDealData(returnedDeal.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (_.isEmpty(dealData)){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
    <h1 onClick={()=> console.log(dealData)}>log deal data</h1>
      <div className="float-container col-md-8">
          <div className = "float-child info col-md-4">
            <h2>{dealData.name}</h2>
            <div className="box-flex">
              <img src={dealData.company.logo} onerror="this.onerror=null; this.remove();" alt='img' width="100"/>
              <EditDeal deal={dealData}/><ArchiveButton/>
            </div>
            <p>Created on:</p><h6><Moment format="hh:mm:ss A MM/DD/YYYY">{dealData.createdAt}</Moment></h6>
            <p>Amount: </p><h6>${dealData.amount}</h6>
            <p>Expected Close Date </p><h6><Moment format ="MM/DD/YYYY">{dealData.expectedCloseDate}</Moment></h6>
            <p>Stage: </p><h6>{dealData.stage}</h6>
          </div>
          <div className = "float-child deals col-md-4 text-center">
            <h2 className="deals-title">Timeline</h2>
             <DealTimeline stageHistory={dealData.stageHistory}/>
          </div>
        </div>
    </>
  );
};

export default DealView;
