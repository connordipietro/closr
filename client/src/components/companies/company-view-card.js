import EditCompany from './company-modals/edit-company'
import Moment from 'react-moment'
import DeleteButton from '../buttons/deleteButton'
import { deleteCompany } from '../../actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const CompanyViewCard = (props) => {
  const { company, companyId } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDeleteCompany = () => {
    dispatch(deleteCompany(companyId));
    history.push("/companies");
  }
  return (
    <div class="card" width="18rem">
      <div class="card-body">
        <div className="space-between">
          <h3 class="card-title">{company.name}</h3>
          <img src={company.logo ? company.logo : ""} width="40 auto"/>
          <div className="space-between">
            <EditCompany company={company} id={companyId}/>
            <DeleteButton deleteFunction={handleDeleteCompany} type="company" />
          </div>
        </div>
        <div className="card-subtitle text-muted">{company.city}, {company.state}</div>
        <ul class="list-group list-group-flush mt-3">
          <li class="list-group-item">
            <div className="space-between">
              <div>Phone:</div>
              <div>{company.phone}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div className="space-between">
              <div>Industry:</div>
              <div>{company.industry}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div className="space-between">
              <div>Owner/CEO:</div>
              <div>{company.owner}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div className="space-between">
              <div>Created on:</div>
                <Moment format="MM/DD/YY">{company.createdAt}</Moment>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyViewCard;
