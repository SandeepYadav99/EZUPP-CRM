import { AppBar } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import styles from "./Style.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import data from "./data";
// import BirthdayEvent from "./BirthdayEvent";
import { useSelector } from "react-redux";
// import WaitingComponent  from "../../../../../components/Waiting.component";
import { makeStyles, useTheme } from "@mui/styles";
import EventCard from "./EventCard.component";

import imageLogo1 from "../../../../assets/Assets/ic_contacts_blue.png";
import imageLogo2black from "../../../../assets/Assets/ic_messages_grey.png";
import imageLogo3 from "../../../../assets/Assets/ic_task_list_blue.png";
import imageLogo1black from "../../../../assets/Assets/ic_contacts@2x.png";
import imageLogo2 from "../../../../assets/Assets/ic_messages_blue.png";
import imageLogo3black from "../../../../assets/Assets/ic_task_list_grey.png";

import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { Typography } from "@mui/material";
import TaskList from "./TaskListCard";
import MessageCard from "./MessageCard";


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    "-webkit-overflow-scrolling": "touch",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function EmployeeTab() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );

  return (
    // <div className={styles.eventBirthdayWrapper}>
    <ShadowBox className={styles.containerWidth}>
      <Tabs
        classes={{ root: classes.root }}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          className={"iconTabsEvents"}
          label={
            <div className={styles.iconTabsEvents_Box}>
              {value === 0 ? (
                <img alt="text" src={imageLogo1} />
              ) : (
                <img alt="text" src={imageLogo1black} />
              )}
              <Typography
                component="span"
                variant="h5"
                color={value === 0 ? "primary" : "text.secondary"}
              >
                Contacts
              </Typography>
            </div>
          }
          style={{ textTransform: "none" }}
        />
        <Tab
          className={"iconTabsEvents"}
          label={
            <div className={styles.iconTabsEvents_Box}>
              {value === 1 ? (
                <img alt="text" src={imageLogo2} />
              ) : (
                <img alt="text" src={imageLogo2black} />
              )}
              <Typography
                component="span"
                variant="h5"
                color={value === 1 ? "primary" : "text.secondary"}
              >
                Messages
              </Typography>
              {/* <Typography component="span" color>Messages</Typography>  */}
              <Typography className={styles.messageCounter} component="span">
                5
              </Typography>
            </div>
          }
          style={{ textTransform: "none" }}
        />
        <Tab
          className={"iconTabsEvents"}
          label={
            <div className={styles.iconTabsEvents_Box}>
              {value === 2 ? (
                <img alt="text" src={imageLogo3} />
              ) : (
                <img alt="text" src={imageLogo3black} />
              )}
              <Typography
                component="span"
                variant="h5"
                color={value === 2 ? "primary" : "text.secondary"}
              >
                Task List
              </Typography>
            </div>
          }
          style={{ textTransform: "none" }}
        />
      </Tabs>
      <div
        style={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}
      >
        <TabPanel value={value} index={0} dir={"ltr"}>
          <EventCard data={data?.contacts} item={"contact"} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={"ltr"}>
          {/* <EventCard data={data?.messages} item={'messages'} /> */}
          <MessageCard data={data?.messages} item={"messages"} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={"ltr"} style={{overflow:"scroll"}}>
          {/* <EventCard data={data?.tasksList} item={'taskList'} /> */}
          <TaskList data={data?.tasksList} item={"taskList"} />
        </TabPanel>
      </div>
    </ShadowBox>
    /* </div> */
  );
}

export default EmployeeTab;
