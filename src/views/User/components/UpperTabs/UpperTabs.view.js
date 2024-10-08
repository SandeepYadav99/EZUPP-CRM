import React  from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserView from "../User/User.view";
import WorkProfile from "../../components/Work/WorkProfile.view";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

import useUpperTabsHook from "./UpperTabsHook";

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
        <div className={"container"}>
          <div className={styles.innerContainer}>{children}</div>
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const ProfileView = () => {
  const {
    form,
    errorData,
 
    listData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
 
    value,
    setValue,
    setValidateContact,
    image,
    setTypeOf,
    setPhoneContact,
    handleSubmitToSave,
    isSubmitting,
    setContery,
    setIsValidContact,
    setCountry
    
  } = useUpperTabsHook({});

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            className={"iconTabs"}
            icon={<PersonOutlineIcon fontSize={"small"} />}
            label="Personal Info"
            {...a11yProps(0)}
          />
          <Tab
            className={"iconTabs"}
            icon={<WorkOutlineIcon fontSize={"small"} />}
            label="Work Info"
            {...a11yProps(1)}
          />
          {/* <Tab
            className={"iconTabs"}
            icon={<ShareIcon fontSize={"small"} />}
            label="Social"
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </AppBar>

      <div className={styles.paperBackground}>
        <TabPanel value={value} index={0}>
          <UserView
            form={form}
            errorData={errorData}
            changeTextData={changeTextData}
            onBlurHandler={onBlurHandler}
            handleSubmit={handleSubmit}
            image={image}
            setTypeOf={setTypeOf}
            setPhoneContact={setPhoneContact}
            setValidateContact={setValidateContact}
            setIsValidContact={setContery}
            setIsValid={setIsValidContact}
            setCountry={setCountry}
            
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkProfile  form={form}
            errorData={errorData}
            changeTextData={changeTextData}
            onBlurHandler={onBlurHandler}
            handleSubmitToSave={handleSubmitToSave}
            listData={listData}
            setTypeOf={setTypeOf}
            setPhoneContact={setPhoneContact}
            isSubmitting={isSubmitting}/>
        </TabPanel>
      
      </div>
    </div>
  );
};

export default ProfileView;
