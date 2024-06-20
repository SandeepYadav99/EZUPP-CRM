import React from "react";
import styles from "./Style.module.css";
import useTopicView from "./TopicView.hook.js";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import { Button, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component.js";
import {
  Backup as BackupIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import removeTask from "../../../../../assets/Assets/ic_delete@2x.png";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ActionButton, PrimaryButton } from "../../../../../components/Buttons/PrimaryButton.js";
import CustomIosSwitch from "../../../../../components/FormFields/CustomIosSwitch.js";

const TopicViewForm = ({
  dataExist,
  isOpen,
  handletoggleSidePannel,
  listlength = 0,
}) => {
  const {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
  } = useTopicView(dataExist,isOpen, handletoggleSidePannel, listlength);

  const renderDialog = () => {
    if (confirmPopUp) {
      return (
        <Dialog
          keepMounted
          open={confirmPopUp}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className={styles.dialogWrap}>
            <Typography variant="subtitle1">
              Are your sure you want to Delete ?
            </Typography>

            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 4 }} onClick={handleDialogClose}>
                  CANCEL
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <PrimaryButton
                  color={"primary"}
                  sx={{ mt: 4, ml: 4 }}
                  onClick={() => suspendItem()}
                >
                  CONFIRM
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Dialog>
      );
    }
    return null;
  };

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>FAQ</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
      </div>
      <div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.title}
              errorText={errorData?.title}
              label={"Topic Header/Question (Max 100 Character )"}
              value={form?.title}
              onTextChange={(text) => {
                changeTextData(text, "title");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.visible_to}
              errorText={errorData?.visible_to}
              label={"Applies to"}
              value={form?.visible_to}
              handleChange={(value) => {
                changeTextData(value, "visible_to");
              }}
            >
              <MenuItem value={"GENERAL"}>General</MenuItem>;
            </CustomSelectField>
          </div>
        </div>
        <br />

        <div className={styles.bottomFlex}>
          <CustomIosSwitch
            styles={{ marginLeft: "20px" }}
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            label={form?.status ? "Active" : "Inactive"}
          />
          {dataExist && (
            <div>
              <IconButton onClick={handleDelete}>
                <img src={removeTask} alt="task" width={20} />
              </IconButton>
            </div>
          )}
        </div>
        {renderDialog()}
        <br />
        <div className={styles.submitBtn}>
          <PrimaryButton onClick={handleSubmit}>
            {dataExist ? "Update" : "Save"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TopicViewForm;
