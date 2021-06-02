import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from "react-redux";
import { getCompaniesByRevenue } from '../../../actions';
import { useEffect } from 'react';

const DashboardView2 = () => {
  const {companies} = useSelector(state => state.revenueData);
  
  companies.forEach(a => delete a._id);
  const newCompanies = companies.map(a => ({ name: a.name, y: a.total}));

  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getCompaniesByRevenue());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getCompaniesByRevenue]);
   
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
      data: newCompanies,
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
export default DashboardView2;