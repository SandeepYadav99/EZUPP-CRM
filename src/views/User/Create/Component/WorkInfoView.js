import React from "react";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete, MenuItem, TextField, Typography } from "@mui/material";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomCheckbox from "../../../../components/FormFields/CustomCheckbox";

import CustomMultiComplete from "../../../../components/FormFields/AutoCompleteText/MultiComplete";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
const WorkInfoView = ({
  errorData,
  form,
  changeTextData,
  onBlurHandler,
  manager,
  department,
}) => {

  return (
    <>
      <ShadowBox className={styles.mainBox}>
        <div className={"headerFlex"}>
          <Typography
            fontSize={18}
            // color={"#636578"}
            fontWeight={600}
          >
            Work Information
          </Typography>
        </div>

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
            <CustomMultiComplete
              // multiple
              // showImage
              className={styles.marginTop}
              AutoCompleteList={department}
              label={"Department"}
              error={errorData?.department}
              
              value={form?.department }
              onTextChange={(text) => {
                changeTextData(text, "department");
              }}
              enableField={["name"]}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomMultiComplete
              // multiple
              // showImage
              // className={styles.marginTop}
              AutoCompleteList={[]}
              label={"Designation"}
              error={errorData?.designation}
              value={form?.designation}
              onTextChange={(text) => {
                changeTextData(text, "designation");
              }}
              enableField={["name"]}
            />
            {/* <CustomTextField
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
            /> */}
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
              {manager?.map((item) => {
                return (
                  <MenuItem
                    value={item?.id}
                  >{`${item?.name} (${item?.employee_id})`}</MenuItem>
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
              onChange={(value) => {
                if (form?.joining_date > value) {
                  SnackbarUtils.error(
                    "Joining date should not be greater than end date"
                  );
                } else {
                  changeTextData(value, "end_date");
                }
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
              handleChange={() => {
                changeTextData(!form?.userManage, "userManage");
              }}
              label={`User is a manager?`}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              value={form?.invoiteToUser}
              handleChange={() => {
                changeTextData(!form?.invoiteToUser, "invoiteToUser");
              }}
              label={`Send Invite to user on email`}
            />
          </div>
        </div>
      </ShadowBox>
    </>
  );
};

export default WorkInfoView;
