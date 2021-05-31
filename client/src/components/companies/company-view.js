import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
import { getCompanyById } from "../../actions";
import EditCompany from './edit-company'
import './company-style.css';
import _ from "lodash";

const CompanyView = (props) => {
  const { company }  = useSelector(state => state.companyView);
  const { error } = useSelector(state => state.companyView);
  const companyId = props.match.params._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyById(companyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompanyById]);


  function renderCompany() {
    // if there is no error and the company has associated deals, return the company details and the associated list of deals
    if ((_.isEmpty(error) && (!_.isEmpty(company.deals)))) {
      let deals = company.deals.map(deal => deal)
      return (
        <div className="float-container col-md-8">
          <div className = "float-child info col-md-4">
            <h2>Company Info <EditCompany company={company} id={companyId}/></h2>
            <div className="box-flex">
              <img src={company.logo} onerror="this.onerror=null; this.remove();" alt='img' width="100"/>
              <h4>{company.name}</h4>
            </div>
            <p>Created on:</p><h6>{company.createdAt}</h6>
            <p>Owner/CEO: </p><h6>{company.owner}</h6>
            <p>Phone: </p><h6>{company.phone}</h6>
            <p>Location: </p><h6>{company.city}, {company.state}</h6>
            <p>Industry: </p><h6>{company.industry}</h6>
          </div>
          <EditCompany company={company} id={companyId}/>
          <div className = "float-child deals col-md-4">
            <h2 className="deals-title">Associated Deals</h2>
             {/* loop through the array of deals and render each detail in its respective tag */}
            {deals.map((deal, id) => (
              <div key={id} >
                <p>{deal.name}</p>
                <h6>Amount: ${deal.amount}</h6>
                <h6>Stage: {deal.stage}</h6>
              </div>
            ))
            }
          </div>
        </div>
      );
     // if there is no error and the company does not have associated deals, return the company details
    } else if ((_.isEmpty(error) && (_.isEmpty(company.deals)))) {
      return (
        <div className="float-container col-md-8">
          <div className = "float-child info col-md-4">
            <h2>Company Info <EditCompany company={company} id={companyId}/></h2>
            <h4>{company.name}</h4>
            <p>Created on:</p><h6>{company.createdAt}</h6>
            <p>Owner/CEO: </p><h6>{company.owner}</h6>
            <p>Phone: </p><h6>{company.phone}</h6>
            <p>Location: </p><h6>{company.city}, {company.state}</h6>
            <p>Industry: </p><h6>{company.industry}</h6>
          </div>
          <EditCompany company={company} id={companyId}/>
          <div className = "float-child deals col-md-4">
            <h2 className="deals-title">Associated Deals</h2>
            <h6>There are no deals associated with this company</h6>
          </div>
        </div>
      );
    // if there is an error, return the respective error message
  } else if (!_.isEmpty(error)) {
    return (
      <div className="float-container col-md-8">
        <p>Sorry, something went wrong, please try again at a later time.</p>
      </div>
    )
  }
};

  return (
    <div className="text">
      <Link to="/" variant="primary"><Button className="btn-return">Return to full list</Button></Link>
      {renderCompany()}
      {/* <EditCompany company={company} id={companyId}/> */}
    </div>
  );
};

export default CompanyView;
