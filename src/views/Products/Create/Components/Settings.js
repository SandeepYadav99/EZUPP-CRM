import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Typography } from "@mui/material";
import CustomCheckbox from "../../../../components/FormFields/CustomCheckbox";
import CheckboxWithText from "../../../../components/RadioButtons/CheckboxWithText";
import useStyleGuide from "../../../StyleGuide/StyleGuide.hook";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
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
  const { checkboxValue, handleCheckboxChange } = useStyleGuide({});
  return (
    <>
      <ShadowBox className={styles.product}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"title"} className={"heading"}>
              Settings
            </Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.status}
                  errorText={errorData?.status}
                  label={"Status"}
                  value={form?.status}
                  handleChange={(value) => {
                    changeTextData(value, "status");
                  }}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                  <MenuItem value="DRAFT">DRAFT</MenuItem>
                  <MenuItem value="DELETED">DELETED</MenuItem>
                </CustomSelectField>
              </div>

              <div className={"formGroup"}>
             
              </div>
            </div>
            <div className={`formFlex ${styles.space}`}>
              <div className={`formGroup `}>
                <CheckboxWithText
                  title="Show Public"
                  description="Make the product visible to public"
                  checked={form?.is_show_public}
                  className={styles.boxWidth}
                  handleChange={() => {
                    changeTextData(!form?.is_show_public, "is_show_public");
                  }}
                  value={form?.is_show_public}
                ></CheckboxWithText>
                {/* <div className={styles.box}>
                  <CustomCheckbox
                    value={form?.is_show_public}
                    handleChange={() => {
                      changeTextData(!form?.is_show_public, "is_show_public");
                    }}
                    label={
                      <Typography variant="subtitle1">Show Public</Typography>
                    }
                  />
                  <Typography
                    color={"text.secondary"}
                    sx={{ ml: 4, mt: -1 }}
                    variant="body1"
                  >
                    Make the product visible to public
                  </Typography>
                </div> */}
              </div>

              <div className={`formGroup ${styles.left}`}>
                <CheckboxWithText
                  title="Value Add"
                  description="Value add help text to be shown here"
                  checked={form?.is_value_add}
                  className={styles.boxWidth}
                  handleChange={() => {
                    changeTextData(!form?.is_value_add, "is_value_add");
                  }}
                  value={form?.is_value_add}
                ></CheckboxWithText>
                {/* <div className={styles.box1}>
                  <CustomCheckbox
                    value={form?.is_value_add}
                    handleChange={() => {
                      changeTextData(!form?.is_value_add, "is_value_add");
                    }}
                    label={
                      <Typography variant="subtitle1">Value Add</Typography>
                    }
                  />
                  <Typography
                    color={"text.secondary"}
                    sx={{ ml: 4, mt: -1 }}
                    variant="body1"
                  >
                    Value add help text to be shown here
                  </Typography>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </ShadowBox>
    </>
  );
};

export default Settings;
