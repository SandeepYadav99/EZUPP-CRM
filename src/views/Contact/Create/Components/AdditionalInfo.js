import React from "react";
import styles from "../../Styles.module.css";
import { MenuItem, ButtonBase, Typography } from "@mui/material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
const AdditionalInfo = (errorData, changeTextData, onBlurHandler, form) => {
  return (
    <ShadowBox className={styles.contact}>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <Typography variant={"title"} className={"heading"}>
            Additional Information
          </Typography>
        </h4>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.time_zone}
            errorText={errorData?.time_zone}
            label={"Time Zone"}
            value={form?.time_zone}
            handleChange={(value) => {
              changeTextData(value, "time_zone");
            }}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="OTHER"></MenuItem>
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedIn_url}
            errorText={errorData?.linkedIn_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedIn_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
    </ShadowBox>
  );
};

export default AdditionalInfo;
