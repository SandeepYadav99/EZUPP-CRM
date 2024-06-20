import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionGetDashboard } from "../../actions/Dashboard.action";
import styles from "./Style.module.css";
import TopRow from "./components/TopRow/TopRow.component";
import EmployeeTab from "./components/EmployeeTab/EmployeeTab.component";
import GraphComponent from "./components/GraphComponent/Graph";
import HalfDoughnut from "./components/HalfDoughnutGraph/HalfDoughnut";
import Calculator from "./components/Calculator/Calculator";
import QuickAccess from "./components/QuickAccess/QuickAccess";
import Notifications from "./components/Notifications/Notification";
import Schedule from "./components/EmployeeTab/Schedule.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state?.dashboard);

  useEffect(() => {
    dispatch(actionGetDashboard());
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <TopRow />
        <div className={styles.employeeTab}>
          <Schedule />
          <EmployeeTab />
        </div>
        <div className={styles.row}>
          <Calculator />
          <QuickAccess />
        </div>
        <div className={styles.chartsDesktop}>
          <GraphComponent />
          <HalfDoughnut />
          <Notifications />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
