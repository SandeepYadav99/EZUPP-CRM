import React from "react";
import {
  
  ButtonBase,
  CircularProgress,
 
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, Delete as DeleteIcon } from "@mui/icons-material";
import styles from "./Style.module.css";

import { makeStyles } from "@mui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import useRoleCreateHook from "./RoleCreateHook";
import RoleTableComponent from "../RoleTable.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import history from "../../../libs/history.utils";

import {
  ActionButton,
 
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";


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
        <Typography variant={"h4"} fontWeight={600} >{id ? "Edit" : "Create"} Role</Typography>
      </div>

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
          <div className={"formGroup"}>
            <Typography variant="subtitle1" fontWeight={600}>Status</Typography>
              <CustomSwitch
                value={form?.is_active}
                handleChange={() => {
                  changeTextData(!form?.is_active, "is_active");
                }}
                label={form?.is_active ? `Active` : "Inactive"}
              />
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
            ) : id ? (
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
