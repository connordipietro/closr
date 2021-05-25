import AddCompany from "./add-company";
import { getCompanies } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

function Companies() {
  const { companies } = useSelector((state) => state.companyData);
  const dispatch = useDispatch();

  useEffect(() => {
    // loads all compaines on initial render
    dispatch(getCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompanies]);

  function renderCompaniesDisplay() {
    if (!_.isEmpty(companies)) {
      // if companies returned from dispatch, render companies
      const companyTableRows = companies.map((item) => {
        return (
          <tr key={item.name}>
            <td>
              <Link to={`companies/${item._id}`}>{item.name}</Link>
            </td>
            <td>{item.owner}</td>
            <td>{item.phone}</td>
            <td>
              {item.city}, {item.state}
            </td>
            <td>{item.industry}</td>
            <td>{item.createdAt}</td>
          </tr>
        );
      });

      return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Main Contact</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Location</th>
                <th scope="col">Industry</th>
                <th scope="col">Create Date</th>
              </tr>
            </thead>
            <tbody>{companyTableRows}</tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div>
      {renderCompaniesDisplay()}
      <AddCompany />
    </div>
  );
}

export default Companies;
