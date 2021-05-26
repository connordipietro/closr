import { getCompanies } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
import _ from 'lodash'
import { FormControl } from 'react-bootstrap'

import '../App.css'

import { Link } from 'react-router-dom';


const  Paginate = () => {
 
  const [pageNumber, setPageNumber] = useState(1)

  const [name, setName] = useState('')

  const dispatch = useDispatch();


  const handleOnChange = (e) => {
    setName(e.target.value)
    e.preventDefault()
    dispatch(getCompanies(pageNumber, name))
  };

  const handleNextPage =  (e) => {

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
 
  return (
    
    <div className="row">
      <div className="col-md-8 mx-auto">
        
          <a onClick={handlePrevPage} href="#" className="previous round ">&#8249;</a>
              <div class="boxed">
                {pageNumber}
              </div>
          <a onClick={handleNextPage} href="#" className="previous round  ">&#8250;</a>

      </div>
    </div>
  )
    


}

export default Paginate