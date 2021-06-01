import React from 'react';
import DashboardView1 from "./dashboard-display-1";
import DashboardView2 from "./dashboard-display-2";
import DashboardView3 from "./dashboard-display-3";
import DashboardView4 from "./dashboard-display-4";
import "./style.css";

function DashboardView() {
  return (
    <React.Fragment>
      <div className="box-flex">
      <DashboardView1 className="display"/>
      <DashboardView2 className="display"/>
      </div>
      <div className="box-flex">
      <DashboardView3 className="display"/>
      <DashboardView4 className="display"/>
      </div>
    </React.Fragment>
  );
};

export default DashboardView;