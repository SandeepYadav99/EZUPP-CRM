import React from "react";
// import { ButtonBase } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useEventFormHook from "./EventForm.hook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import {
  OutlineButton,
  PrimaryButton,
} from "../../../../components/Buttons/PrimaryButton";
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
          <CustomSwitch
            value={form?.is_all_day}
            handleChange={() => {
              changeTextData(!form?.is_all_day, "is_all_day");
            }}
            label={`All Day`}
          />
           <div>
            {/* <CustomDatePicker
              clearable
              label={"Start Date"}
              maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "start_date");
              }}
              value={form?.start_date}
              isError={errorData?.start_date}
            /> */}
          </div>
          <div>
            <CustomDatePicker
              // clearable
              label={"End Date"}
              maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "end_date");
              }}
              value={form?.end_date}
              isError={errorData?.end_date}
            />
          </div> 
          <CustomTextField
            isError={errorData?.event_url}
            errorText={errorData?.event_url}
            label={"Event URL"}
            value={form?.event_url}
            onTextChange={(text) => {
              changeTextData(text, "event_url");
            }}
            onBlur={() => {
              onBlurHandler("event_url");
            }}
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "guest_name");
            }}
            value={form?.guest_name}
            // id="tags-standard"
            options={listData ? listData : []}
            getOptionLabel={(option) => option.title}
            defaultValue={form?.guest_name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Add Guests"
                error={errorData?.guest_name}
              />
            )}
          />
          <CustomTextField
            isError={errorData?.location}
            errorText={errorData?.location}
            label={"Location"}
            value={form?.location}
            onTextChange={(text) => {
              changeTextData(text, "location");
            }}
            onBlur={() => {
              onBlurHandler("location");
            }}
          />{" "}
          <CustomTextField
            isError={errorData?.description}
            errorText={errorData?.description}
            label={"Description"}
            value={form?.description}
            onTextChange={(text) => {
              changeTextData(text, "description");
            }}
            onBlur={() => {
              onBlurHandler("description");
            }}
          />
        </div>
        <div className={styles.printFlex}>
          <PrimaryButton onClick={handleSubmit}>ADD</PrimaryButton>
          <OutlineButton>CANCEL</OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
