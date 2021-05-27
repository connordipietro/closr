import { getCompanies } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import './pagination.css'

const  Paginate = () => {
  const dispatch = useDispatch();

  const itemsCount = useSelector(state => state.companyData.count)
  let numOfPages = itemsCount/5

  const [pageNumber, setPageNumber] = useState(1)
  const [name, setName] = useState('')

  useEffect(() => {
      dispatch(getCompanies(pageNumber))   
  },[ pageNumber])
  

  const handleNextPage = async() => {     
    if(pageNumber == numOfPages){
      setPageNumber(numOfPages)
    }
    else{
      setPageNumber(page => page + 1)
    }
  };

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
          <a onClick={handlePrevPage} href={() => false} className="previous round ">&#8249;</a>
              <div class="boxed">
                {pageNumber}
              </div>
          <a onClick={handleNextPage} href={() => false} className="previous round  ">&#8250;</a> 
          
      </div>
    </div>
  )
    

}

export default Paginate



