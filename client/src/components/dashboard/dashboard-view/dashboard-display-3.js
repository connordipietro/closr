/*  */import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from '../../../actions';
import { useEffect } from 'react';

const DashboardView3 = () => {

  const dispatch = useDispatch();
  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);
   
    const options = {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Conversion percentage by stage'
    },
    xAxis: {
      categories: ['Initiated', 'Qualified', 'Contract Sent'],
      title: {
          text: null
      }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Deals Won'
        }
    },
    plotOptions: {
      bar: {
        dataLabels: {
            enabled: true
        }
    }
    },
    tooltip: {
        formatter: function() {
            return 'Deals Won: <b>'+ this.y +'</b>';
        }
    },
    series: [{
        name: '',
        colorByPoint: true,
        data: [1,2,10],
        showInLegend: false,
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
      <App />
    </div>
  );
  }
export default DashboardView3;