import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Typography, Autocomplete, TextField } from "@mui/material";
import CustomCheckbox from "../../../../components/FormFields/CustomCheckbox";
import styles from "../Style.module.css";


const Settings = ({
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
            <Typography variant= {"title"} className={"heading"}>Settings</Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.lowerWrap}>
            
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.role}
                  errorText={errorData?.role}
                  label={"Status"}
                  value={form?.role}
                  handleChange={(value) => {
                    changeTextData(value, "role");
                  }}
                 
                >
                  {listData?.ROLES?.map((role) => (
                    <MenuItem value={role?.id}>{role?.name}</MenuItem>
                  ))}
                 
                </CustomSelectField>
              </div>
              
             
              <div className={"formGroup"}>
              </div>
           
            </div>
        <div className={`formFlex ${styles.space}`}>
            <div className={styles.box}>
            <div className={"formGroup "}>
           
            <CustomCheckbox
              value={form?.userManage}
              handleChange={() => {
                changeTextData(!form?.userManage, "userManage");
              }}
              label={<Typography variant="subtitle1">Show Public</Typography>}
             
            />
            <Typography color= {"text.secondary"} sx={{ ml: 4, mt: -1 }} variant="body1">Make the product visible to public</Typography>
           
          </div>
          </div>

          <div className={styles.box1}>
          <div className={"formGroup "}>
           
            <CustomCheckbox
              
              value={form?.valueAdd}
              handleChange={() => {
                changeTextData(!form?.valueAdd, "valueAdd");
              }}
              label={<Typography variant="subtitle1">Value Add</Typography>}
             
            />
            <Typography color= {"text.secondary"} sx={{ ml: 4 , mt: -1}} variant="body1">Value add help text to be shown here</Typography>
           
          </div>
          </div>
          
        </div>
            
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
