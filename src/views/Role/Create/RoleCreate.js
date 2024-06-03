import React from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBackIos, Delete as DeleteIcon } from "@mui/icons-material";
import styles from "./Style.module.css";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { Autocomplete } from "@mui/lab";
import useRoleCreateHook from "./RoleCreateHook";
import RoleTableComponent from "../RoleTable.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import history from "../../../libs/history.utils";

import {
  ActionButton,
  OutlineButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";

// import CustomSwitch from "../../../FormFields/CustomSwitch";
// import CustomCheckbox from "../../../FormFields/CustomCheckbox";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const HubMasterCreate = ({ handleSideToggle, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    isSubmitting,
    data,
    cancelRole,
    permisionChangeHandler,
    id,

    permission,
  } = useRoleCreateHook({ handleSideToggle, isSidePanel, empId });
  const classes = useStyles();

  return (
    <>
      <div className={styles.iconButton}>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIos color={"#636578"} fontSize={"small"} />{" "}
        </ButtonBase>
        <Typography variant={"h4"} fontWeight={600} color={"#636578"}>{id ? "Update" : "Create"} Role</Typography>
      </div>

      {/* {empId && (
          <IconButton
            variant={"contained"}
            className={classes.iconBtnError}
            onClick={toggleAcceptDialog}
            type="button"
          >
            <DeleteIcon />
          </IconButton>
        )} */}

      <div className={styles.container}>
        <ShadowBox width={"100%"}>
          <Typography
            fontSize={18}
            // color={"#636578"}
            fontWeight={600}
            
          >
            Role Details
          </Typography>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label="Role Name"
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.displayName}
                errorText={errorData?.displayName}
                label="Display Name"
                value={form?.displayName}
                onTextChange={(text) => {
                  changeTextData(text, "displayName");
                }}
                onBlur={() => {
                  onBlurHandler("displayName");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.description}
                errorText={errorData?.description}
                multiline
                rows="3"
                label="Role Description"
                value={form?.description}
                onTextChange={(text) => {
                  changeTextData(text, "description");
                }}
                onBlur={() => {
                  onBlurHandler("description");
                }}
              />
            </div>
          </div>
        </ShadowBox>
        <>
          <RoleTableComponent
            classes={classes}
            // data={data}
            permissions={permission}
            changeTextData={changeTextData}
            permisionChangeHandler={permisionChangeHandler}
          />
        </>

        <div className={styles.actionButton}>
          <ActionButton onClick={cancelRole}>CANCEL</ActionButton>
          <PrimaryButton
            variant={"contained"}
            color={"primary"}
            type={"submit"}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : empId ? (
              "UPDATE"
            ) : (
              "SAVE"
            )}
          </PrimaryButton>
        </div>
      </div>

      {/* <DeleteModal
        isOpen={isAcceptPopUp}
        handleToggle={toggleAcceptDialog}
        empId={empId}
        suspendItem={suspendItem}
      /> */}
    </>
  );
};

export default HubMasterCreate;
