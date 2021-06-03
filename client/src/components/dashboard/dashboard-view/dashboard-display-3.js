import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getConversionsByStage } from "../../../actions"; 
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

const DashboardView3 = () => {
  const {deals} = useSelector(state => state.conversionData);

  const dispatch = useDispatch();
<<<<<<< HEAD
  
  const dealConversion = deals.map(a => ({ stage: a.stage, y: a.conversionPercentage.toFixed(2)*100}));
=======
  const dealConversion = deals.map(a => ({ stage: a.stage, y: Math.round(a.conversionPercentage.toFixed(2)*100)}));
>>>>>>> 494810d60053d8861d581c7fa8dd11e5d3f5e03e
  
  useEffect(() => { // loads all deals on initial render
    dispatch(getConversionsByStage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getConversionsByStage]);
   
  NoDataToDisplay(Highcharts);
  Highcharts.setOptions({
    lang: {
      noData: 'Data is not available'
    }
  });

    const options = {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Conversion Percentage by Stage (%)'
    },
    xAxis: {
      categories: ['Initiated', 'Qualified', 'Contract Sent'],
      title: {
          text: null
      }
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: null
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
            return 'Deals Won at this stage: <b>'+ this.y +'%</b>';
        }
    },
    series: [{
        name: '',
        colorByPoint: true,
        data: dealConversion,
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