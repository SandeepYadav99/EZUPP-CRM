import React from "react";
// import { ButtonBase } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "./../../../components/FormFields/TextField/TextField.component";
import useEventFormHook from "./UnitCreate.hook";
import CustomSelectField from "./../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete, MenuItem, TextField, Tooltip } from "@mui/material";
import CustomDatePicker from "./../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSwitch from "./../../../components/FormFields/CustomSwitch";
import CustomCheckbox from "./../../../components/FormFields/CustomCheckbox";
import {Delete as DeleteIcon, Info as InfoIcon} from "@mui/icons-material";
import {
  OutlineButton,
  PrimaryButton,
} from "./../../../components/Buttons/PrimaryButton";
// import { Autocomplete } from "@material-ui/lab";

const EventForm = ({ isOpen, handleToggle, candidateId, isInterview }) => {
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    listData,
  } = useEventFormHook({ isOpen, handleToggle, candidateId, isInterview });

  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
        <h4 className={styles.infoTitle}>
                        <div className={styles.heading}>Type</div>
                        <Tooltip title="Info" aria-label="info" placement="right">
                            <InfoIcon fontSize={'small'}/>
                        </Tooltip>

        </h4>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Unit Name"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
          <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              value={form?.userManage}
              handleChange={() => {
                changeTextData(!form?.userManage, "userManage");
              }}
              label={`Is General`}
            />
          
        </div>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.is_all_day}
            handleChange={() => {
              changeTextData(!form?.is_all_day, "is_all_day");
            }}
            label={`Active ?`}
          /></div>
         </div>   
        </div>
        <div style={{float: 'right'}}>
          <PrimaryButton onClick={handleSubmit}>SUBMIT</PrimaryButton>
        
        </div>
      </div>
    </div>
  );
};

export default EventForm;
