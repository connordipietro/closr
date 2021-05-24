import AddCompany from './add-company';
import { getCompanies } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash'

function Companies() {
  const { companies } = useSelector(state => state.companyData);
  const dispatch = useDispatch();

  useEffect(() => { // loads all compaines on initial render
    dispatch(getCompanies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getCompanies]);

  function renderCompaniesDisplay () {
    if (!_.isEmpty(companies)) { // if companies returned from dispatch, render companies
      const companyTableRows = companies.map(item => {
        return (
          <tr key={item.name}>
            <td>{item.name}</td>
          </tr>
          )
      })

      return (
        <div>
          <table className="table">
            <thead>
              <tr key="company-names">
                <th scope="col">Company Name</th>
              </tr>
            </thead>
            <tbody>
              {companyTableRows}
            </tbody>
          </table>
        </div>
      );
    };
  };

  return (
    <div>
      {renderCompaniesDisplay()}
      <AddCompany />
    </div>
  );
};

export default Companies;
