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
   
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
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
export default DashboardView1;