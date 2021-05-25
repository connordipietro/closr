// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getCompanyById } from "../actions";

const CompanyView = (props) => {
  const { companies } = useSelector((state) => state.companyData);
  const companyId = props.match.params._id;
  //const dispatch = useDispatch();
  const company = companies.find((company) => company._id === companyId);

  // useEffect(() => {
  //   dispatch(getCompanyById(companyId));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getCompanyById]);

  function renderCompany() {
    return (
      <div>
        <h1>{company.name}</h1>
        <h2>{company.industry}</h2>
      </div>
    );
  }

  return (
    <div className="text">
      <Link to="/">Back</Link>
      {renderCompany()}
      <hr />
    </div>
  );
};

export default CompanyView;