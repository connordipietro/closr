import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from '../../../actions';
import { useEffect } from 'react';


const DashboardView1 = () => {
  const { deals }  = useSelector(state => state.dealsData);
  const dispatch = useDispatch();
  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);

  
  function renderDashboardDisplay1() {
    return (
      
      <div className="float-container col-md-8">
        <div className = "float-child info">
          <h2>Company Info </h2>
        </div>
      </div>
    )}
   
    const options = {
      title: {
        text: 'My chart'
      },
      series: [{
        data: [1, 2, 3]
      }]
    }
    
    const App = () => <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
    
  return (
    <div className="text">
      {renderDashboardDisplay1()}
      <App />
    </div>
  );
  }
export default DashboardView1;