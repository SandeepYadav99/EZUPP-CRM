import React from 'react'
import styles from "../../Styles.module.css";
import { MenuItem, ButtonBase, Typography } from "@mui/material";
import ShadowBox from '../../../../components/ShadowBox/ShadowBox';
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
const BusinessInfo = (errorData, changeTextData, onBlurHandler, form) => {
  return (
    <ShadowBox className={styles.contact}>
     <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <Typography variant={"title"} className={"heading"}>
          Business Information
          </Typography>
        </h4>
      </div>
      <div className={"formFlex"}>
            <div className={"formGroup"}>
            <CustomTextField
                type="name"
                isError={errorData?.business_name}
                errorText={errorData?.business_name}
                label={"Business Name"}
                value={form?.age}
                onTextChange={(text) => {
                  changeTextData(text, "business_name");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.country}
                errorText={errorData?.country}
                label={"Industry"}
                value={form?.country}
                handleChange={(value) => {
                  changeTextData(value, "country");
                }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="OTHER"></MenuItem>
              </CustomSelectField>
            </div>
            
      </div>
      <div className={"formFlex"}>
            <div className={"formGroup"}>
            <CustomTextField
                type="name"
                isError={errorData?.website}
                errorText={errorData?.website}
                label={"Website"}
                value={form?.age}
                onTextChange={(text) => {
                  changeTextData(text, "website");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.buying_role}
                errorText={errorData?.buying_role}
                label={"Buying Role"}
                value={form?.country}
                handleChange={(value) => {
                  changeTextData(value, "buying_role");
                }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="OTHER"></MenuItem>
              </CustomSelectField>
            </div>
            </div>
            <div className={"formFlex"}>
            <div className={"formGroup"}>
            <CustomTextField
                type="name"
                isError={errorData?.company_size}
                errorText={errorData?.company_size}
                label={"Company Size"}
                value={form?.age}
                onTextChange={(text) => {
                  changeTextData(text, "company_size");
                }}
              />
            </div> 
            <div className={"formGroup"}></div>
            </div>
    </ShadowBox>
  )
}

export default BusinessInfo