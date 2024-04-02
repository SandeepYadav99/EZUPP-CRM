import { AppBar } from '@mui/material';
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import styles from "./Style.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
// import BirthdayEvent from "./BirthdayEvent";
import { useSelector } from "react-redux";
// import WaitingComponent  from "../../../../../components/Waiting.component";
import { makeStyles, useTheme } from "@mui/styles";
import EventCard from "./EventCard.component";
import dataValue from "./data.json";

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
    <div className={styles.eventBirthdayWrapper}>
      <div className={styles.eventBgImage}></div>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          classes={{ root: classes.root }}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={"iconTabsEvents"} label="Contacts" style={{textTransform:"none"}}/>
          <Tab className={"iconTabsEvents"} label="Messages" style={{textTransform:"none"}}/>
          <Tab className={"iconTabsEvents"} label="Task List" style={{textTransform:"none"}}/>
        </Tabs>
      </AppBar>
      <div className={styles.paperBackground1}>
        <TabPanel value={value} index={0} dir={"ltr"}>
          <EventCard data={dataValue?.birthdays}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={"ltr"}>
        <EventCard data={dataValue?.birthdays}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={"ltr"}>
        <EventCard data={dataValue?.birthdays}/>
        </TabPanel>
      </div>
    </div>
  );
}

export default EmployeeTab;
