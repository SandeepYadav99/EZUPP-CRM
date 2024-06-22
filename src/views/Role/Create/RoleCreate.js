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
import {
  CreateActionComponent,
  CreateHeadaerComponent,
  CreateHeadaerView,
  HeaderTitleComponet,
} from "../../../components/CustomListHeader/CustomListHeader";

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
      <CreateHeadaerComponent title={id ? "Edit Role" : "Create Role"} />
      <div className={styles.container}>
        <ShadowBox width={"100%"}>
         
          <HeaderTitleComponet headerTitle={" Role Details"}/>
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
          <div>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                ml: theme.spacing(1.5),
                mt: theme.spacing(1),
              }}
            >
              Status
            </Typography>
            <CustomIosSwitch
              className={styles.statusActive}
              checked={form?.is_active ? true : false}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={form?.is_active ? `Active` : "Inactive"}
            />
          </div>
        </ShadowBox>
        <div>
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
        <CreateActionComponent
          handleSubmit={handleSubmit}
          isRemove={true}
          isSubmitting={isSubmitting}
          removeHandler={cancelRole}
          title={id ? "UPDATE" : "SAVE"}
        
        />
      
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
