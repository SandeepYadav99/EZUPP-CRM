import React, { Component } from "react";



import styles from "./Style.module.css";

// import {serviceProviderUserCheck} from "../../services/User.service";



import File from "../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../FormFields/TextField.component";
import CustomSelectField from "../../../FormFields/SelectField/SelectField.component";
import CustomPhoneContactField from "../../../FormFields/CustomPhoneContact.componet";


import CustomDatePicker from "../../../FormFields/DatePicker/CustomDatePicker";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import history from "../../../libs/history.utils";
import { ActionButton } from "../../../components/Buttons/PrimaryButton";
import { MenuItem } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   iconBtnError: {
//     color: theme.palette.error.dark,
//   },
//   deleteBtn: {
//     color: "red",
//     // borderBottom: '1px solid red'
//   },
// }));

const UserCreate = ({
  handleToggleSidePannel,
  errorData,
  changeTextData,
  form,
  onBlurHandler,
  handleSubmit,
  image,
  setPhoneContact,
  setTypeOf,
  setCountry,
  id,
}) => {
  // const classes = useStyles();

  return (
    <>
      <div className={styles.outerFlex1}>
        <div>
          <ActionButton onClick={()=>history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <span>
              <b>{id === "true" ? "Update" : "Add"} User</b>
            </span>
          </ActionButton>
         
        </div>
      </div>
      
      <div className={"plainPaper"}>
        
    
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>State Details</div>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.count}>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="document"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.image}
              value={form?.image}
              // default_image={images ? images : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
                }
              }}
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={" Name"}
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
                  isError={errorData?.email}
                  errorText={errorData?.email}
                  label={"User Name"}
                  value={form?.email}
                  onTextChange={(text) => {
                    changeTextData(text, "email");
                  }}
                  onBlur={() => {
                    onBlurHandler("email");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
             
                <CustomTextField
                  isError={errorData?.email}
                  errorText={errorData?.email}
                  label={"Email ID"}
                  value={form?.email}
                  onTextChange={(text) => {
                    changeTextData(text, "email");
                  }}
                  onBlur={() => {
                    onBlurHandler("email");
                  }}
                />
             
              
              </div>
              <div className={"formGroup"}>
                <CustomPhoneContactField
                  isError={errorData?.contact}
                  errorText={errorData?.contact}
                  value={form?.contact}
                  onTextChange={(text) => {
                    changeTextData(text, "contact");
                  }}
                  isValid={(value) => {
                    if (value.match(/12345/)) {
                      return "";
                    } else if (value.match(/1234/)) {
                      return false;
                    } else {
                      return true;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.role}
              errorText={errorData?.role}
              label={" Role"}
              value={form?.role}
              handleChange={(value) => {
                changeTextData(value, "role");
              }}
            >
              <MenuItem value={"MANAGER"}>Manager</MenuItem>
              <MenuItem value={"OWNER"}>Owner</MenuItem>
            </CustomSelectField>
          </div>
        </div>
      </div>
      <>
        <div className={styles.outerFlex1}></div>
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
                  return <MenuItem value={item?.id}>{`${item?.name}   (${item?.employee_id})`}</MenuItem>;
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
                // maxDate={new Date(new Date().getFullYear(), 11, 31)}
                onChange={(value) => {
                  changeTextData(value, "joining_date");
                }}
              
                format={"dd-MM-yyyy"}
                value={form?.joining_date}
                isError={errorData?.joining_date}
                errorText={errorData?.joining_date}
              />
            </div>
            <div className={"formGroup"}>
            <CustomDatePicker
                clearable
                label={"End Date"}
                 maxDate={new Date()}
                // maxDate={new Date(new Date().getFullYear(), 11, 31)}
                onChange={(value) => {
                  changeTextData(value, "joining_date");
                }}
              
                format={"dd-MM-yyyy"}
                value={form?.joining_date}
                isError={errorData?.joining_date}
                errorText={errorData?.joining_date}
              />
            </div>
          </div>
          <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              value={form?.status}
              // handleChange={() => {
              //   changeTextData(!form?.status, "status");
              // }}
              label={`User is a manager?`}
            />
          </div>
        </div>
        </div>
   
        <div className={styles.saveButton}>
            <ActionButton
              variant={"contained"}
              color={"primary"}
              type="button"
              // onClick={handleSaveClick}
            >
               {/* {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : ( */}
                 Save
              {/* )} */}
              
            </ActionButton>
          </div>
      </>
    </>
  );
};

export default UserCreate;
