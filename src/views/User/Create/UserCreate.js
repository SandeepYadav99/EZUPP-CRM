import React, { Component } from "react";

import styles from "./Style.module.css";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import {
  Button,
  ButtonBase,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";

import CustomPhoneContactField from "../../../FormFields/CustomPhoneContact.componet";
import {
  ActionButton,
  ArrowActionButton,
  ArrowOutlineButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import WorkInfoView from "./Component/WorkInfoView";
import PersonalInformation from "./Component/PersonalInformation";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";

// import {serviceProviderUserCheck} from "../../services/User.service";
// const useStyles = makeStyles((theme) => ({
//   iconBtnError: {
//     color: theme.palette.error.dark,
//   },
//   deleteBtn: {
//     color: "red",
//     // borderBottom: '1px solid red'
//   },
// }));

const UserCreate = ({
  handleToggleSidePannel,
  errorData,
  changeTextData,
  form,
  onBlurHandler,
  handleSubmit,
  image,
  setPhoneContact,
  setTypeOf,
  setCountry,
  id,
}) => {
  // const classes = useStyles();

  return (
    <>
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <Typography variant={"h4"}>
              {id === "true" ? "Update" : "Add"} User
            </Typography>
          </ButtonBase>
        </div>
      </div>
      <PersonalInformation />
      <>
        <WorkInfoView />

        <div className={styles.saveButton}>
          <PrimaryButton
            color={"primary"}

            // onClick={handleSaveClick}
          >
            {/* {isSubmitting ? ( */}
            {/* <CircularProgress color="success" size="20px" />
              ) : (  */}
            Save
            {/* )} */}
          </PrimaryButton>
        </div>
      </>
    </>
  );
};

export default UserCreate;
