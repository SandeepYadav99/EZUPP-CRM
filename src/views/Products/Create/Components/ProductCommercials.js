import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Typography, Autocomplete, TextField } from "@mui/material";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { useState, useEffect } from "react";
import {serviceGetUnitList} from "../../../../services/Unit.service";
const ProductCommercials = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  image,
  listData,
  unitsList,
  allData,
  ...props
}) => {
  console.log(form, "Form");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await serviceGetUnitList(); 
        setUnits(response.data); 
      } catch (error) {
        console.error("Error fetching unit list:", error);
        
      }
    };

    fetchUnits();
  }, []);
  return (
    <>
      <ShadowBox className={styles.product}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"title"} className={"heading"}>
              Product Commercials
            </Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.currency}
                  errorText={errorData?.currency}
                  label={"Currency"}
                  value={form?.currency}
                  handleChange={(value) => {
                    changeTextData(value, "currency");
                  }}
                  // className={styles.custonCSS}
                >
                  <MenuItem value={"INR"}>INR</MenuItem>
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"EURO"}>EURO</MenuItem>
                </CustomSelectField>
              </div>

              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.unit_id}
                  errorText={errorData?.unit_id}
                  label={"Measure Unit"}
                  value={form?.unit_id}
                  handleChange={(value) => {
                    changeTextData(value, "unit_id");
                  }}
                  unitsList={allData}
                >
                  {listData?.UNITS?.map((unit) => (
                    <MenuItem value={unit?.id}>{unit?.name}</MenuItem>
                  ))}
                  {/* {unitsList &&
    unitsList.map((unit) => (
      <MenuItem key={unit.id} value={unit.id}>
        {unit.name}
      </MenuItem>
    ))} */}
                </CustomSelectField>
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.ballpark_cost}
                  errorText={errorData?.ballpark_cost}
                  label={"Ballpark Cost"}
                  value={form?.ballpark_cost}
                  onTextChange={(text) => {
                    changeTextData(text, "ballpark_cost");
                  }}
                  onBlur={() => {
                    onBlurHandler("ballpark_cost");
                  }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.ballpark_price}
                  errorText={errorData?.ballpark_price}
                  label={"Ballpark Price"}
                  value={form?.ballpark_price}
                  onTextChange={(text) => {
                    changeTextData(text, "ballpark_price");
                  }}
                  onBlur={() => {
                    onBlurHandler("ballpark_price");
                  }}
                />
              </div>
            </div>
            <div className={`formFlex ${styles.space}`}>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.discount_percent}
                  errorText={errorData?.discount_percent}
                  label={"Discount Percent"}
                  value={form?.discount_percent}
                  onTextChange={(text) => {
                    changeTextData(text, "discount_percent");
                  }}
                  onBlur={() => {
                    onBlurHandler("discount_percent");
                  }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.discount_value}
                  errorText={errorData?.discount_value}
                  label={"Discount Value"}
                  value={form?.discount_value}
                  onTextChange={(text) => {
                    changeTextData(text, "discount_value");
                  }}
                  onBlur={() => {
                    onBlurHandler("discount_value");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ShadowBox>
    </>
  );
};

export default ProductCommercials;
