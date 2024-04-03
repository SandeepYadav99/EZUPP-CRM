import React from "react";
// import { ButtonBase } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useEventFormHook from "./EventForm.hook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem } from "@mui/material";

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
  } = useEventFormHook({ isOpen, handleToggle, candidateId, isInterview });

  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Title"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
          <CustomSelectField
            isError={errorData?.type}
            errorText={errorData?.type}
            label={"Label"}
            value={form?.type}
            handleChange={(value) => {
              changeTextData(value, "type");
            }}
          >
            <MenuItem value="BUSINESS">BUSINESS</MenuItem>
            <MenuItem value="PERSONAL">PERSONAL</MenuItem>
            <MenuItem value="FAMILY">FAMILY</MenuItem>
            <MenuItem value="HOLIDAY">HOLIDAY</MenuItem>
            <MenuItem value="ETC">ETC</MenuItem>
          </CustomSelectField>
          <div>
            <CustomTextField
              isError={errorData?.comment}
              errorText={errorData?.comment}
              label={"Add comments (Optional)"}
              value={form?.comment}
              onTextChange={(text) => {
                changeTextData(text, "comment");
              }}
              onBlur={() => {
                onBlurHandler("comment");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
        <div className={styles.printFlex}>
          {/* <ButtonBase
            onClick={handleSubmit}
            disabled={!declaration ? true : false}
            className={
              declaration ? styles.createBtn : styles.disabledCreatebtn
            }
          >
            CONFIRM
          </ButtonBase> */}
        </div>
      </div>
    </div>
  );
};

export default EventForm;
