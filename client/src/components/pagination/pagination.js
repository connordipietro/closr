import { getCompanies } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import './pagination.css'

const  Paginate = () => {
  const dispatch = useDispatch();

  // gets the total items so we can calculate how many pages we need
  const itemsCount = useSelector(state => state.companyData.count)
  let numOfPages = Math.ceil(itemsCount/5)

  console.log(numOfPages);
  const [pageNumber, setPageNumber] = useState(1)
  const [name, setName] = useState('')

  // dipatch and fetch based on change of the depandencies
  useEffect(() => {
      dispatch(getCompanies(pageNumber))   
  },[ pageNumber])
  

  // sets the state for next page.
  // conditional to to prevent from going over total page limit
  const handleNextPage = () => {    
     if(pageNumber == numOfPages) {
       setPageNumber(numOfPages)
     }
     else {
       setPageNumber(page => page + 1)
     }
  };

  // sets the state for next page.
  // conditional to to prevent from going over total page limit
  const handlePrevPage =  (e) => { 
   if(pageNumber == 1){
     setPageNumber(1)
   }
   else {
     setPageNumber(page => page - 1)
   }
 }

 
  return (
    <div className="row container-for-a-tags">
      <div className="col-md-8 a-tag-children">  
          <button onClick={handlePrevPage}  className="previous arrow">&#8249;</button>
              <div className="boxed">
                {pageNumber}
              </div>
          <button onClick={handleNextPage}  className="previous arrow">&#8250;</button>        
      </div>
    </div>
  )   
}

// this will export and gets rendered in company views
export default Paginate



