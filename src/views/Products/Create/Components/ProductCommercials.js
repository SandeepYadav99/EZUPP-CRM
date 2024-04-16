import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Typography, Autocomplete, TextField } from "@mui/material";
import CustomPhoneContactField from "../../../../FormFields/CustomPhoneContact.componet";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import styles from "../Style.module.css";
import img from "../../../../assets/img/1.png";
const ProductCommercials = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  image,
  listData,
}) => {
  console.log(form, "Form");
  return (
    <>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant= {"title"} className={"heading"}>Product Commercials</Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.lowerWrap}>
            
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.role}
                  errorText={errorData?.role}
                  label={"Currency"}
                  value={form?.role}
                  handleChange={(value) => {
                    changeTextData(value, "role");
                  }}
                  // className={styles.custonCSS}
                >
                  {listData?.ROLES?.map((role) => (
                    <MenuItem value={role?.id}>{role?.name}</MenuItem>
                  ))}
                  {/* <MenuItem value={"OWNER"}>Owner</MenuItem> */}
                </CustomSelectField>
              </div>
              
             
              <div className={"formGroup"}>
              <CustomSelectField
                  isError={errorData?.role}
                  errorText={errorData?.role}
                  label={"Measure Unit"}
                  value={form?.role}
                  handleChange={(value) => {
                    changeTextData(value, "role");
                  }}
                  // className={styles.custonCSS}
                >
                  {listData?.ROLES?.map((role) => (
                    <MenuItem value={role?.id}>{role?.name}</MenuItem>
                  ))}
                  {/* <MenuItem value={"OWNER"}>Owner</MenuItem> */}
                </CustomSelectField>
              </div>
           
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.ballparkCost}
                  errorText={errorData?.ballparkCost}
                  label={"Ballpark Cost"}
                  value={form?.name}
                  onTextChange={(text) => {
                    changeTextData(text, "ballparkCost");
                  }}
                  onBlur={() => {
                    onBlurHandler("ballparkCost");
                  }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.ballparkPrice}
                  errorText={errorData?.ballparkPrice}
                  label={"Ballpark Price"}
                  value={form?.ballparkPrice}
                  onTextChange={(text) => {
                    changeTextData(text, "ballparkPrice");
                  }}
                  onBlur={() => {
                    onBlurHandler("ballparkPrice");
                  }}
                />
              </div>
            </div>
            <div className={`formFlex ${styles.space}`}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.discountPercent}
                  errorText={errorData?.discountPercent}
                  label={"Discount Percent"}
                  value={form?.discountPercent}
                  onTextChange={(text) => {
                    changeTextData(text, "discountPercent");
                  }}
                  onBlur={() => {
                    onBlurHandler("discountPercent");
                  }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.discountValue}
                  errorText={errorData?.discountValue}
                  label={"Discount Value"}
                  value={form?.userName}
                  onTextChange={(text) => {
                    changeTextData(text, "discountValue");
                  }}
                  onBlur={() => {
                    onBlurHandler("discountValue");
                  }}
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCommercials;
