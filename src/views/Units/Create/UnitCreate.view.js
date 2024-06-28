import React from "react";
// import { ButtonBase } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "./../../../components/FormFields/TextField/TextField.component";
import useUnitCreateHook from "./UnitCreate.hook";
import CustomSelectField from "./../../../components/FormFields/SelectField/SelectField.component";
import {  Dialog, Tooltip, Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import CustomIosSwitch from "../../../components/FormFields/CustomIosSwitch";
import CustomCheckbox from "./../../../components/FormFields/CustomCheckbox";
import { Delete as DeleteIcon, Info as InfoIcon } from "@mui/icons-material";
import {
  ActionButton,
  PrimaryButton,
} from "./../../../components/Buttons/PrimaryButton";
import removeTask from "../../../assets/Assets/ic_delete@2x.png";
// import { Autocomplete } from "@material-ui/lab";
import { useParams } from "react-router";
const EventForm = ({ isOpen, handleToggle, candidateId, isInterview, id , isEdit}) => {
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    handleDelete,
    openDialog,
    closeDialog,
    isDialogOpen,
    editData,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    listData,
  } = useUnitCreateHook({ isOpen, handleToggle, candidateId, isInterview, id});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.unit);
 
  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
          <div className={styles.wrapper}>
          <div className={styles.infoTitle}>
            <div className={styles.heading}>
            <Typography variant="subtitle1">Type</Typography> 
            </div>
            <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
            
          </div>
          {isEdit && (
            <IconButton onClick={openDialog}>
                  
                  <img src={removeTask} alt="task" width={20} />
                  </IconButton>
            )}
          </div>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Unit Name"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
          <div className={"formFlex"} style={{marginLeft: "-10px"}}>
            <div className={"formGroup"}>
              <CustomCheckbox
                value={form?.is_general}
                handleChange={() => {
                  changeTextData(!form?.is_general, "is_general");
                }}
                label={`Is General`}
              />
            </div>
            <div className={"formGroup"}>
              <CustomIosSwitch
                value={form?.status}
                checked={form?.status ? true : false}
                handleChange={() => {
                  changeTextData(!form?.status, "status");
                }}
                //label={`Active ?`}
                label={form?.status ? "Active" : "Inactive"}
              />
            </div>
          </div>
        </div>
        <div style={{ float: "right" }} className={styles.buttonWrapper}>
          <PrimaryButton onClick={handleSubmit}>{isEdit ? "UPDATE" : "SUBMIT"}</PrimaryButton>
        </div>
      </div>
      <Dialog
        open={isDialogOpen} 
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.dialogWrap}>
            <Typography variant="subtitle1">
              {"Are your sure you want to delete the unit ?"}
            </Typography>
            
            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 4 }} onClick={closeDialog}>
                  CANCEL
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <PrimaryButton
                  color={"primary"}
                  sx={{ mt: 4 , ml: 4}}
               
                onClick={() => handleDelete(id)}
                >
                  CONFIRM
                </PrimaryButton>
              </div>
            </div>
          </div>
      </Dialog>
    </div>
  );
};

export default EventForm;
