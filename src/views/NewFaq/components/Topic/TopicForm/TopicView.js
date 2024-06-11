import React from "react";
import styles from "./Style.module.css";
import useTopicView from "./TopicView.hook.js";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../../components/FormFields/CustomSwitch.js";
import { Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component.js";
import {
  Backup as BackupIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const TopicViewForm = () => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    onChangeCheckBox,
    handleEditor,
    industries,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
    taglist,
    editor_data,
    anchor,
    coverImage,
    checked,
  } = useTopicView();

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
              label={"Author"}
              value={form?.visible_to}
              handleChange={(value) => {
                changeTextData(value, "visible_to");
              }}
            >
              <MenuItem value={"BOTH"}>General</MenuItem>;
            </CustomSelectField>
          </div>
        </div>
        <br />

        <div className={styles.bottomFlex}>
          <CustomSwitch
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            label={`${form?.status ? "ACTIVE" : "INACTIVE"} `}
          />
          <div>
            <IconButton
              variant={"contained"}
              onClick={handleDelete}
              type="button"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <br />
        <div className={styles.submitBtn}>
          <Button
            className={"sub"}
            variant={"contained"}
            color={"primary"}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicViewForm;
