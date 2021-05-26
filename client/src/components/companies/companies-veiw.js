import { getCompanies } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
import _ from 'lodash'
import { FormControl } from 'react-bootstrap'

import './App.css'

import { Link } from 'react-router-dom';

function CompaniesView() {
  const { companies } = useSelector(state => state.companyData);
  
  const [pageNumber, setPageNumber] = useState(1)

  const [name, setName] = useState('')

  const dispatch = useDispatch();

  useEffect(() => { // loads all compaines on initial render
    dispatch(getCompanies(pageNumber));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getCompanies]);

  const handleOnChange = (e) => {
    setName(e.target.value)
    e.preventDefault()
    dispatch(getCompanies(pageNumber, name))
  };

  const handleNextPage =  (e) => {

    e.preventDefault()
    setPageNumber(page => page + 1 )
    dispatch(getCompanies(pageNumber))
    console.log(pageNumber)
  };

  const handlePrevPage =  (e) => {
    e.preventDefault()
    
    setPageNumber(page => page - 1 )
     dispatch(getCompanies(pageNumber))
     console.log(pageNumber)
  }

  function renderCompaniesDisplay () {
    if (!_.isEmpty(companies)) { // if companies returned from dispatch, render companies
      const companyTableRows = companies.map(item => {
      return (
        <tr key={item.name}>
          <td><Link to={`companies/${item._id}`}>{item.name}</Link></td>
          <td>{item.owner}</td>
          <td>{item.phone}</td>
          <td>{item.city}, {item.state}</td>
          <td>{item.industry}</td>
          <td>{item.createdAt}</td>
        </tr>
        );
      }
    );

    return (
      <div>
        <FormControl onChange={handleOnChange} type="text" placeholder="Search By Name" className="col w-25 ml-5 mb-5" />
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
          <tbody>
              {companyTableRows}
          </tbody>
        </table>
      </div>
      );
    };
  };

return (
  <div >
    {renderCompaniesDisplay()}
  </div>
  );
};

export default CompaniesView;
