import React, { useState } from "react";
import styles from "./Styles.module.css";
import { Dialog, ButtonBase, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import {
  OutlineButton,
  ActionButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import removeTask from "../../../assets/Assets/ic_delete@2x.png";
import editTask from "../../../assets/Assets/ic_edit_blue@2x.png";
import noshow from "../../../assets/Assets/ic_no_show@2x.png";
import revenue from "../../../assets/Assets/ic_revenue@2x.png";
import appointment from "../../../assets/Assets/ic_appointment@2x.png";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import StatusPill from "../../../components/Status/StatusPill.component";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import data from "./Data";

import { it } from "date-fns/locale";
const CustomerDetail = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAppointmentTab, setSelectedAppointmentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAppointmentTabChange = (event, newValue) => {
    setSelectedAppointmentTab(newValue);
  };

  const getStatusPillColor = () => {
    if (data?.status === "ACTIVE") {
      return "active";
    } else if (data?.status === "DELETED") {
      return "high";
    } else if (data?.status === "In Progress") {
      return "active";
    } else if (data?.status === "DRAFT") {
      return "draft";
    }
  };
  return (
    <div>
      <div>
        <div className={styles.upperFlex}>
          <ButtonBase onClick={() => history.push("/contact")}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <span>
              <Typography variant={"h4"}>Customer Profile</Typography>
            </span>
          </ButtonBase>
          <div></div>
          <div className={styles.profileHeading}></div>
        </div>
        {data.Data.map((item, index) => (
          <>
            <div className={styles.gridContainer}>
              <ShadowBox className={styles.product}>
                <div className={styles.edit}>
                  <Typography variant="h5">{item.name}</Typography>
                  <OutlineButton >EDIT</OutlineButton>
                </div>
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  style={{ marginTop: -8 }}
                >
                  {item.phone}
                </Typography>
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ mb: 1 }}
                >
                  {item.email}
                </Typography>
                <StatusPill status={"In Progress"} color={"active"} />
                <div className={styles.line}></div>
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ mt: 1.5 }}
                >
                  Gender: {item.gender}
                </Typography>
                <Typography variant="h6" color={"text.secondary"}>
                  D.O.B: {item.dob}
                </Typography>
                <Typography variant="h6" color={"text.secondary"}>
                  Anniversary: {item.dob}
                </Typography>
              </ShadowBox>

              <div className={styles.gridColumn}>
                <ShadowBox className={styles.product1}>
                  <Typography variant="h5" sx={{ mb: 4 }}>
                    {" "}
                    Overview
                  </Typography>
                  <div className={styles.row21}>
                    <div className={styles.overview}>
                      <img
                        src={appointment}
                        alt="app"
                        className={styles.overImg}
                      ></img>
                      <div className={styles.overviewComp}>
                        <Typography variant="h3">3</Typography>
                        <Typography variant="body1">Appointments</Typography>
                      </div>
                    </div>
                    <div className={styles.overview}>
                      <img
                        src={noshow}
                        alt="app"
                        className={styles.overImg}
                      ></img>
                      <div className={styles.overviewComp}>
                        <Typography variant="h3">0</Typography>
                        <Typography variant="body1">No Show</Typography>
                      </div>
                    </div>
                    <div className={styles.overview}>
                      <img
                        src={revenue}
                        alt="app"
                        className={styles.overImg}
                      ></img>
                      <div className={styles.overviewComp}>
                        <Typography variant="h3">0</Typography>
                        <Typography variant="body1">Total Revenue</Typography>
                      </div>
                    </div>
                  </div>
                </ShadowBox>
              </div>
              
            </div>
            <PrimaryButton
              onClick={() => {
                // handleEdit();
              }}
              className={styles.downbtn}
            >
              DOWNLOAD
            
            </PrimaryButton>
            <div>
              <ShadowBox className={styles.tab}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Appointment List" />
                  <Tab label="Sale List" />
                  <Tab label="Campaign" />
                </Tabs>
                {selectedTab === 0 && (
                  <div>
                    <Tabs
                      value={selectedAppointmentTab}
                      onChange={handleAppointmentTabChange}
                    >
                      <Tab label="Upcoming Appointments" />
                      <Tab label="Missed Appointments" />
                      <Tab label="Cancelled Appointments" />
                      <Tab label="Completed Appointments" />
                    </Tabs>
                    {selectedAppointmentTab === 0 && (
                      <div>
                        <Typography></Typography>
                      </div>
                    )}
                    {selectedAppointmentTab === 1 && (
                      <div>
                        <Typography></Typography>
                      </div>
                    )}
                    {selectedAppointmentTab === 2 && (
                      <div>
                        <Typography></Typography>
                      </div>
                    )}
                    {selectedAppointmentTab === 3 && (
                      <div>
                        <Typography></Typography>
                      </div>
                    )}
                  </div>
                )}
                {selectedTab === 1 && (
                  <div>
                    <Typography></Typography>
                  </div>
                )}
                {selectedTab === 2 && (
                  <div>
                    <Typography></Typography>
                  </div>
                )}
              </ShadowBox>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetail;
