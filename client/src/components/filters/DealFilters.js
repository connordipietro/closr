import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesList, getDeals } from '../../actions';
import FilterButton from '../buttons/filterButton'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const DealFilters = () => {
  const [company, setCompany] = useState();
  const [range, setRange] = useState();

  const dispatch = useDispatch();
  
  const companiesList = useSelector(state => state.companiesList);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getCompaniesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompaniesList]);

  const handleFilter = (companyId, rangeBounds) =>{
    dispatch(getDeals(companyId, rangeBounds))
  }
  const onSelection = (event) => {
    setCompany(event.target.value);
    handleFilter(event.target.value, range);
  }
  const onSliderChange = (rangeValue) => {
    setRange(rangeValue);
    handleFilter(company, rangeValue);
  }

  return (
    <>
    <div className='row' >
      <div className='col'>
          <select onChange={onSelection} value={company}>
              <option value=''>All Companies</option>
              {companiesList.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
      </div>
      <div className='col'>
          <Range 
              allowCross={false}
              tipFormatter={value => value}
              defaultValue={[0, 1500]}
              min={0}
              max={1500}
              marks={{0: 0, 1500: 1500}}
              draggableTrack={true}
              onAfterChange={onSliderChange}
            />
      </div>
        <div className='col'>
          <FilterButton onClick={handleFilter}/>
        </div>
      </div>
    </>
  )
}

export default DealFilters