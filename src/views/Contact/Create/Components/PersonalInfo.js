import React from "react";
import styles from "../../Styles.module.css";
import { MenuItem, Tooltip, Typography } from "@mui/material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomPhoneContactField from "../../../../FormFields/CustomPhoneContact.componet";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import RadioButtons from "../../../../components/RadioButtons/RadioButtons";
import prefer from "../../../../assets/Assets/ic_prefer_not_to_say.png";
import female from "../../../../assets/Assets/ic_female.png";
import male from "../../../../assets/Assets/ic_male.png";
import Constants from "../../../../config/constants";
import {  InfoOutlined as InfoIcon } from "@mui/icons-material";
import LogUtils from "../../../../libs/LogUtils";
const PersonalInfo = ({errorData, changeTextData, onBlurHandler, form}) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <ShadowBox className={styles.contact}>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <Typography variant={"title"} className={"heading"}>
            Personal Information
          </Typography>
          <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
      </div>
      <div className={styles.outerFlex}>
        <div className={styles.lowerWrap}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <div className={styles.lineWrapper}>
                <CustomSelectField
                  isError={errorData?.prefix}
                  errorText={errorData?.prefix}
                  label={"Prefix"}
                  value={form?.prefix}
                  handleChange={(value) => {
                    changeTextData(value, "prefix");
                  }}
                  // className={styles.prefix}
                >
                  <MenuItem value="INDIA">India</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </CustomSelectField>
                <CustomTextField
                  type="name"
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Full Name"}
                  value={form?.name}
                  className={styles.name}
                  onTextChange={(text) => {
                    changeTextData(text, "name");
                  }}
                />
              </div>
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                type="number"
                isError={errorData?.age}
                errorText={errorData?.age}
                label={"Age"}
                value={form?.age}
                onTextChange={(text) => {
                  changeTextData(text, "age");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Typography variant={"subtitle1"}>Gender</Typography>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <div className={styles.radio}>
                <RadioButtons
                  iconComp={<img src={prefer} />}
                  title="Prefer not to say"
                  checked={selectedValue === Constants.PROFILE_TYPE.PREFER_NOT}
                  handleChange={handleChange}
                  value={Constants.PROFILE_TYPE.PREFER_NOT}
                />
                <RadioButtons
                  iconComp={<img src={female} />}
                  title="Female"
                  checked={selectedValue === Constants.PROFILE_TYPE.FEMALE}
                  handleChange={handleChange}
                  value={Constants.PROFILE_TYPE.FEMALE}
                />
                <RadioButtons
                  iconComp={<img src={male} />}
                  title="Male"
                  checked={selectedValue === Constants.PROFILE_TYPE.MALE}
                  handleChange={handleChange}
                  value={Constants.PROFILE_TYPE.MALE}
                />
              </div>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomPhoneContactField
                isError={errorData?.contact}
                errorText={errorData?.contact}
                value={form?.contact}
                // contactType="Phone No"
                // label={"Phone No."}
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
            <div className={"formGroup"}>
              <CustomTextField
                type="email"
                isError={errorData?.email}
                errorText={errorData?.email}
                label={"Email ID"}
                value={form?.email}
                onTextChange={(text) => {
                  changeTextData(text, "email");
                }}
                // onBlur={() => {
                //   onBlurHandler("name");
                // }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                type="email"
                isError={errorData?.email}
                errorText={errorData?.email}
                label={"Alternate Email"}
                value={form?.email}
                onTextChange={(text) => {
                  changeTextData(text, "email");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomPhoneContactField
                isError={errorData?.contact}
                errorText={errorData?.contact}
                value={form?.contact}
                label={"Phone No."}
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
            <div className={"formGroup"}>
              <CustomTextField
                type="name"
                isError={errorData?.job_title}
                errorText={errorData?.job_title}
                label={"Job Title"}
                value={form?.job_title}
                onTextChange={(text) => {
                  changeTextData(text, "job_title");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.country}
                errorText={errorData?.country}
                label={"Country"}
                value={form?.country}
                handleChange={(value) => {
                  changeTextData(value, "country");
                }}
              >
                <MenuItem value="INDIA">India</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={`formFlex `}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.address}
                errorText={errorData?.address}
                label={"Address"}
                multiline
                rows="3"
                onTextChange={(text) => {
                  changeTextData(text, "address");
                }}
                className={styles.desc}
              />
            </div>
          </div>
        </div>
      </div>
    </ShadowBox>
  );
};

export default PersonalInfo;
