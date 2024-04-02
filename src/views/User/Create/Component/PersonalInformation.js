import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem } from "@mui/material";
import CustomPhoneContactField from "../../../../FormFields/CustomPhoneContact.componet";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import styles from "../Style.module.css";

const PersonalInformation = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
}) => {
  return (
    <div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Personal Information</div>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.count}>
            <File
              // bannerLabel="Profile"
              max_size={2 * 1024 * 1024}
              type={["jpg", "png", "jpeg"]}
              fullWidth={true}
              name="image"
              accept={"image/*"}
              label="Profile"
              // show_image={true}
              link={""}
              user_image
              error={errorData?.image}
              value={form?.image}
              default_image={""}
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
                  label={"Full Name"}
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
                  isError={errorData?.userName}
                  errorText={errorData?.userName}
                  label={"User Name"}
                  value={form?.userName}
                  onTextChange={(text) => {
                    changeTextData(text, "userName");
                  }}
                  onBlur={() => {
                    onBlurHandler("userName");
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
            <div className={"formFlex"}>
          <div className={"formGroup"} >
            <CustomSelectField
              isError={errorData?.role}
              errorText={errorData?.role}
              label={" Role"}
              value={form?.role}
              handleChange={(value) => {
                changeTextData(value, "role");
              }}
              className={styles.custonCSS}
            >
              <MenuItem value={"MANAGER"}>Manager</MenuItem>
              <MenuItem value={"OWNER"}>Owner</MenuItem>
            </CustomSelectField>
          </div>
        </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default PersonalInformation;
