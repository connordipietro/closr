import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
import _ from "lodash";
import axios from "axios";
import EditDeal from './edit-deal'

const DealView = (props) => {
  const dealId = props.match.params._id;
  const dispatch = useDispatch();
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
            <h2>Deal Info <EditDeal deal={dealData}/></h2>
            <div className="box-flex">
              <img src={dealData.company.logo} onerror="this.onerror=null; this.remove();" alt='img' width="100"/>
              <h4>{dealData.name}</h4>
            </div>
            <p>Created on:</p><h6>{dealData.createdAt}</h6>
            <p>Amount: </p><h6>{dealData.amount}</h6>
            <p>Expected Close Date </p><h6>{dealData.expectedCloseDate}</h6>
            <p>Stage: </p><h6>{dealData.stage}</h6>
          </div>
          <div className = "float-child deals col-md-4 text-center">
            <h2 className="deals-title">Timeline</h2>
             {/* loop through the array of deals and render each detail in its respective tag */}
          </div>
        </div>
    </>
  );
};

export default DealView;
