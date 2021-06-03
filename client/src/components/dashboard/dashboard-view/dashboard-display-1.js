import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from "react-redux";
import { getConversionPercentageOverall } from '../../../actions';
import { useEffect } from 'react';

const DashboardView1 = () => {
  const percentage= useSelector(state => state.percentageOverall)

  const dealsView = [];
  const wonDeals = Object.create(percentage);
  wonDeals.name = 'Contracts Won';
  wonDeals.y = percentage.conversion.conversionPercentageOverall;
  dealsView.push(wonDeals);

  const lostDeals = Object.create(percentage);
  lostDeals.name = 'Contracts Lost';
  lostDeals.y = 1 - percentage.conversion.conversionPercentageOverall;
  dealsView.push(lostDeals);

  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getConversionPercentageOverall());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getConversionPercentageOverall]);
   
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Conversion Percentage Overall'
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