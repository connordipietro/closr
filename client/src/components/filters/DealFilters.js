import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesList, getDeals } from '../../actions';
import FilterButton from '../buttons/filterButton'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import axios from 'axios';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const DealFilters = () => {
  const [company, setCompany] = useState();
  const [max, setMax] = useState(10000000);
  const [range, setRange] = useState();
  const dispatch = useDispatch();
  const dealsList = useSelector(state => state.dealsData);
  
  const companiesList = useSelector(state => state.companiesList);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getDeals(company, range))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, company]);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getCompaniesList());
    axios.get("/deals/max-active-deal")
      .then(response => {
        setMax(Math.ceil(response.data.amount));
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompaniesList, dealsList]);

  return (
    <>
    <div className='row mt-2 p-2'>
      <div className='col filter-item d-flex'>
          <select class="form-select" onChange={event=> setCompany(event.target.value)} value={company}>
              <option value=''>Filter by Company</option>
              {companiesList.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
      </div>
      <div className='col filter-item'>
        <span>
          <Range 
              allowCross={false}
              tipFormatter={value => value}
              min={0}
              max={max}
              marks={{0: 0, [max]: max === 10000000 ? "..." : max}}
              draggableTrack={true}
              defaultValue={[0, max]}
              onAfterChange={(value) => setRange(value)}
            />
        </span>
        <div className="center">Filter by Amount</div>
      </div>
    
      </div>
    </>
  )
}

export default DealFilters