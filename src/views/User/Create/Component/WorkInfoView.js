import React, { memo } from "react";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, TextField, Typography } from "@mui/material";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomCheckbox from "../../../../components/FormFields/CustomCheckbox";
import MultiComplete from "../../../../components/FormFields/AutoCompleteText/MultiComplete";
import { useTheme } from "@mui/styles";

const WorkInfoView = ({
  errorData,
  form,
  changeTextData,
  onBlurHandler,
  manager,
  department,
  id,
  designation,
}) => {
  const theme = useTheme();

  return (
    <>
      <ShadowBox className={styles.mainBox}>
        <div className={styles.subContainer}>
          <div className={"headerFlex"}>
            <Typography
              sx={{
                marginBottom: theme.spacing(1),
                [theme.breakpoints.down("sm")]: {
                  margin: "auto",
                },
              }}
              variant="h5"
              fontWeight={600}
              color={theme.palette.text.primary}
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
                // onBlur={() => {
                //   onBlurHandler("employee_id");
                // }}
              />
            </div>

            <div className={"formGroup"}>
              <MultiComplete
                isError={errorData?.department}
                // multiple
                autoSelect
                // isArray
                AutoCompleteList={department}
                getOptionLabel={(option) => option}
                label={"Department"}
                defaultValue={form?.department}
                value={form?.department}
                onTextChange={(text) => {
                  console.log(text);
                  if (text?.length <= 10) {
                    changeTextData(text, "department");
                  }
                }}
                // className={styles.marginTop1}
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <MultiComplete
                isError={errorData?.designation}
                // multiple
                autoSelect
                isArray
                AutoCompleteList={designation}
                getOptionLabel={(option) => option}
                label={"Designation"}
                defaultValue={form?.designation}
                value={form?.designation}
                onTextChange={(text) => {
                  // if (text.length <= 40) {
                  changeTextData(text, "designation");
                  // }
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.manager}
                errorText={errorData?.manager}
                label={"Manager"}
                className={styles.marginTop2}
                value={form?.manager}
                handleChange={(value) => {
                  changeTextData(value, "manager");
                }}
              >
                {manager?.map((item) => {
                  return (
                    <MenuItem
                      key={item?.id}
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
                // className={styles.dateContainer}
                value={form?.joining_date}
                isError={errorData?.joining_date}
                errorText={errorData?.joining_date}
              />
            </div>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                // className={styles.dateContainer}
                label={"End Date"}
                onChange={(value) => {
                  changeTextData(value, "end_date");
                }}
                value={form?.end_date}
                isError={errorData?.end_date}
                errorText={errorData?.end_date}
              />
            </div>
          </div>

          <div className={styles.checkboxAction}>
            <div className={styles.checkbox}>
              <CustomCheckbox
                sx={{  color:theme.palette.text.primary}}
                value={form?.userManage}
                handleChange={() => {
                  changeTextData(!form?.userManage, "userManage");
                }}
                checked={form?.userManage}
              />
              <Typography
                variant="body1"
                sx={{ marginLeft: theme.spacing(-2) }}
              >
                User is a manager?
              </Typography>
            </div>

            <div className={styles.checkbox}>
              {!id && (
                <>
                  <CustomCheckbox
                    sx={{
                      height: "15px",
                      color:theme.palette.text.primary,
                      "& .MuiSvgIcon-root": {  },
                    }}
                    checked={form?.invoiteToUser}
                    value={form?.invoiteToUser}
                    handleChange={() => {
                      changeTextData(!form?.invoiteToUser, "invoiteToUser");
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ marginLeft: theme.spacing(-2) }}
                  >
                    Send Invite to user on email
                  </Typography>
                </>
              )}
            </div>
          </div>
        </div>
      </ShadowBox>
    </>
  );
};

export default memo(WorkInfoView);
