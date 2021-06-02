import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from '../../../actions';
import { useEffect } from 'react';

const DashboardView1 = () => {
  const { deals }  = useSelector(state => state.dealsData);

  const key1 = "Initiated";
  const key2 = "Qualified";
  const key3 = "Contract Sent";
  const key4 = "Closed Lost";
  const key5 = "Closed Won";

  // will rewrite once i find a cleaner way
  const { [key1] : _0, [key2] : _1, [key3] : _2, [key4] : _3, ...won} = deals;
  const { [key1] : _4, [key2] : _5, [key3] : _6, [key5] : _7, ...lost} = deals;

  const dealsView = [];

  const wonDeals = Object.create(won);
  wonDeals.name = 'Contracts Won';
  wonDeals.y = won["Closed Won"]?.items?.length;
  dealsView.push(wonDeals);

  const lostDeals = Object.create(lost);
  lostDeals.name = 'Contracts Won';
  lostDeals.y = lost["Closed Lost"]?.items?.length;
  dealsView.push(lostDeals);

  const dispatch = useDispatch();
  useEffect(() => { 
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
        text: 'Contracts Won vs Lost'
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
        name: 'Contracts',
        colorByPoint: true,
        data: dealsView,
        innerSize: "50%"
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