import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDashboard } from "../../actions/Dashboard.action";
import DashboardBarChart from "./components/BigStat/DashboardBarChart";
import styles from "./Style.module.css";
import TopRow from "./components/TopRow/TopRow.component";
import EmployeeTab from "./components/EmployeeTab/EmployeeTab.component";
import EventCard from "./components/EmployeeTab/EventCard.component";
import dataValue from "./components/EmployeeTab/data.json";

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
            <EventCard data={dataValue?.birthdays}/>
          </div>
          <EmployeeTab/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
