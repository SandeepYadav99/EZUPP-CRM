import React from "react";
import { ButtonBase, CircularProgress, Typography } from "@mui/material";
import { ArrowBackIos, Delete as DeleteIcon } from "@mui/icons-material";
import styles from "./Style.module.css";

import { makeStyles, useTheme } from "@mui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import useRoleCreateHook from "./RoleCreateHook";
import RoleTableComponent from "../RoleTable.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import history from "../../../libs/history.utils";

import {
  ActionButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import CustomIosSwitch from "../../../components/FormFields/CustomIosSwitch";
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
    cancelRole,
    permisionChangeHandler,
    id,
    setPermissions,
    permission,
    setAllData,
    allData,
  } = useRoleCreateHook({ handleSideToggle, isSidePanel, empId });
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={styles.iconButton}>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIos
            sx={{
              color: theme.palette.text.primary,
            }}
            fontSize={"small"}
          />{" "}
        </ButtonBase>
        <Typography
          variant="h4"
          fontWeight={600}
          color={theme.palette.text.primary}
        >
          {id ? "Edit" : "Create"} Role
        </Typography>
      </div>

      <div className={styles.container}>
        <ShadowBox width={"100%"}>
          <Typography
            variant="h5"
            fontWeight={600}
            color={theme.palette.text.primary}
            sx={{
              marginLeft: theme.spacing(1.3),
              // marginTop:theme.spacing(4),
              // marginBottom:theme.spacing(3)
            }}
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
                isError={errorData?.display_name}
                errorText={errorData?.display_name}
                label="Display Name"
                value={form?.display_name}
                onTextChange={(text) => {
                  changeTextData(text, "display_name");
                }}
                onBlur={() => {
                  onBlurHandler("display_name");
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
            <Typography variant="subtitle1" fontWeight={600} sx={{
              marginLeft:theme.spacing(0.3)
            }}>
              Status
            </Typography>
            <CustomIosSwitch
            className={styles.statusActive}
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={form?.is_active ? `Active` : "Inactive"}
            />
          </div>
        </ShadowBox>
        <div >
          <RoleTableComponent
            classes={classes}
            // data={data}
            permissions={permission}
            changeTextData={changeTextData}
            permisionChangeHandler={permisionChangeHandler}
            setPermissions={setPermissions}
            allData={allData}
            setAllData={setAllData}
          />
        </div>

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
