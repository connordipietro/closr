import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from '../../../actions';
import { useEffect } from 'react';

const DashboardView2 = () => {

  const dispatch = useDispatch();
  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);
   
    const options = {
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Top 5 Companies by Revenue'
    },
    yAxis: {
        title: {
            text: 'Total percent market share'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: ${y:.2f}'
            }
        }
    },
    tooltip: {
        formatter: function() {
            return '<b>'+ this.point.name +'</b>: $'+ this.y.toFixed(2);
        }
    },
    series: [{
        name: 'Top 5 Customers',
        colorByPoint: true,
        data: [{
          name: 'Harris Teeter',
          y: 157.43
      }, {
          name: 'Home Depot',
          y: 546.50
      }, {
          name: 'Google',
          y: 200
      }, {
          name: 'Alpaca Chicken',
          y: 350
      }, {
          name: 'Sweetwater',
          y: 420
      }],
        innerSize: '50%',
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
export default DashboardView2;