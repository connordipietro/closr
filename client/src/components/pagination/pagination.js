import { getCompanies } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import './pagination.css'

const  Paginate = () => {
  const dispatch = useDispatch();

  // gets the total items so we can calculate how many pages we need
  const itemsCount = useSelector(state => state.companyData.count)
  let numOfPages = Math.ceil(itemsCount/5)

  const [pageNumber, setPageNumber] = useState(1);
/*   const [name, setName] = useState(''); */

  // dipatch and fetch based on change of the depandencies
  useEffect(() => {
    dispatch(getCompanies(pageNumber))
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ pageNumber])
  

  // sets the state for next page.
  // conditional to to prevent from going over total page limit
  const handleNextPage = () => { 
    pageNumber === numOfPages ? setPageNumber(numOfPages) : setPageNumber(page => page + 1)
  };

  // sets the state for next page.
  // conditional to to prevent from going over total page limit
  const handlePrevPage =  () => { 
    pageNumber === 1 ? setPageNumber(1) : setPageNumber(page => page - 1)
 }

 
  return (
      <ul class="pagination">
        <li class="page-item">
          <div class="page-link pag-text-style" onClick={handlePrevPage}>
            <span aria-hidden="true">&laquo; </span>
            <span class="sr-only">Prev</span>
          </div>
        </li>
        <li class="page-item">
          <div className="page-link pag-text-style">{pageNumber}</div>
        </li>
        <li class="page-item">
          <div class="page-link pag-text-style" onClick={handleNextPage}>
            <span class="sr-only">Next</span>
            <span aria-hidden="true"> &raquo; </span>
          </div>
        </li>
      </ul>

  )   
}

// this will export and gets rendered in company views
export default Paginate



