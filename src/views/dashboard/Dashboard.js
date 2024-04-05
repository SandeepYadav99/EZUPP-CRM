import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  ButtonBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDashboard } from "../../actions/Dashboard.action";
import DashboardBarChart from "./components/BigStat/DashboardBarChart";
import styles from "./Style.module.css";
import TopRow from "./components/TopRow/TopRow.component";
import EmployeeTab from "./components/EmployeeTab/EmployeeTab.component";
import EventCard from "./components/EmployeeTab/EventCard.component";
import dataValue from "./components/EmployeeTab/data.js";
import GraphComponent from "./components/GraphComponent/Graph";
import HalfDoughnut from "./components/HalfDoughnutGraph/HalfDoughnut";
import Calculator from "./components/Calculator/Calculator";
import QuickAccess from "./components/QuickAccess/QuickAccess";
// import dataValue from "./components/EmployeeTab/data.json";
import Notifications from "./components/Notifications/Notification";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state?.dashboard);

  useEffect(() => {
    dispatch(actionGetDashboard());
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <TopRow/>
        <div className={styles.employeeTab}>
          <div className={styles.meetingSchedule}>
            <span style={{fontSize:"18px",fontWeight:"600"}}>Meeting Schedule</span>
            {/* <EventCard data={dataValue?.birthdays}/> */}
          </div>
          <EmployeeTab/>
        </div>
        <Notifications/>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
