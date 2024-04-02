import React from "react";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem } from "@mui/material";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomCheckbox from "../../../../components/FormFields/CustomCheckbox";
const WorkInfoView = ({ errorData, form, changeTextData, onBlurHandler }) => {
  return (
    <>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Work Information</div>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.employee_id}
                  errorText={errorData?.employee_id}
                  label={"Employee ID"}
                  value={form?.employee_id}
                  onTextChange={(text) => {
                    changeTextData(text, "employee_id");
                  }}
                  onBlur={() => {
                    onBlurHandler("employee_id");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.department}
                  errorText={errorData?.department}
                  label={"Department"}
                  value={form?.department}
                  handleChange={(value) => {
                    changeTextData(value, "department");
                  }}
                >
                  {[]?.map((option, index) => (
                    <MenuItem value={option?.id}>{option?.name}</MenuItem>
                  ))}
                </CustomSelectField>
              </div>
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.designation}
              errorText={errorData?.designation}
              label={"Designation"}
              value={form?.designation}
              onTextChange={(text) => {
                changeTextData(text, "designation");
              }}
              // onBlur={() => {
              //   onBlurHandler("designation");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.manager}
              errorText={errorData?.manager}
              label={"Manager"}
              value={form?.manager}
              handleChange={(value) => {
                changeTextData(value, "manager");
              }}
            >
              {[]?.map((item) => {
                return (
                  <MenuItem
                    value={item?.id}
                  >{`${item?.name}   (${item?.employee_id})`}</MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Joining Date"}
              maxDate={new Date()}
              //maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={(value) => {
                changeTextData(value, "joining_date");
              }}
              className={styles.dateContainer}
              value={form?.joining_date}
              isError={errorData?.joining_date}
              errorText={errorData?.joining_date}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              className={styles.dateContainer}
              label={"End Date"}
              maxDate={new Date()}
              // maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={(value) => {
                changeTextData(value, "end_date");
              }}
              value={form?.end_date}
              isError={errorData?.end_date}
              errorText={errorData?.end_date}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              value={form?.userManage}
              // handleChange={() => {
              //   changeTextData(!form?.status, "status");
              // }}
              label={`User is a manager?`}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              value={form?.invoiteToUser}
              // handleChange={() => {
              //   changeTextData(!form?.status, "status");
              // }}
              label={`Send Invite to user on email`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkInfoView;
