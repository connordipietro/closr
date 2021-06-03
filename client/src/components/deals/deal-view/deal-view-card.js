import EditDeal from '../edit-deal';
import Moment from 'react-moment'
import DeleteButton from '../../buttons/deleteButton';
import ArchiveButton from '../../buttons/archiveButton';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const DealViewCard = (props) => {
  const { deal, handleArchiveDeal, handleDeleteDeal, handleEditDeal } = props;
  const history = useHistory();
  const generateArchiveDealButton = (dealStage) => {
    // Only want the option to archive deal if it is closed won or closed lost
    return dealStage === "Closed Won" || dealStage === "Closed Lost" ? <ArchiveButton onClick={handleArchiveDeal}/> : null;
  }
      return (
        <div className="card" width="18rem">
          <div className="card-body">
            <div className="space-between">
              <h3 class="card-title">{deal.name}</h3>
              <img src={deal.company.logo ? deal.company.logo : ""} width="40" height="40"/>
              <div className="space-between">
                <div className="icon-spacing">
                  <EditDeal deal={deal} handleEditDeal={handleEditDeal} />
                </div>
                <div className="icon-spacing">
                <DeleteButton deleteFunction={handleDeleteDeal} type="deal" />
                </div>
                <div className="icon-spacing">
                  {deal.archived ? <p>Deal Archived</p> : generateArchiveDealButton(deal.stage)}
                </div>
              </div>
            </div>
            <div className="card-subtitle text-muted"><Link to={`/companies/${deal.company._id}`}>{deal.company.name}</Link></div>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item">
                <div className="space-between">
                  <div>Amount:</div>
                  <div>${deal.amount}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="space-between">
                  <div>Stage:</div>
                  <div>{deal.stage}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="space-between">
                  <div>Expected Close Date:</div>
                  <Moment format="MM/DD/YY">{deal.expectedCloseDate}</Moment>
                </div>
              </li>
              <li className="list-group-item">
                <div className="space-between">
                  <div>Created on:</div>
                    <Moment format="MM/DD/YY">{deal.createdAt}</Moment>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
};

export default DealViewCard;
