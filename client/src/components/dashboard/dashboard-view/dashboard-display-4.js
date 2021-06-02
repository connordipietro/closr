import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from '../../../actions';
import { useEffect } from 'react';

const DashboardView4 = () => {

  const dispatch = useDispatch();
  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);
   
    const options = {
      chart: {
        type: 'column'
    },
    title: {
        text: 'Revenue By Month'
    },
    xAxis: {
      categories: ['December', 'January', 'February', 'March', 'April', 'May'],
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
          return '<b>$'+ this.y.toFixed(2) +'</b>';
      }
  },
    series: [{
        name: '',
        colorByPoint: true,
        data: [10000,12000,18000,12400,8000,6500],
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
export default DashboardView4;