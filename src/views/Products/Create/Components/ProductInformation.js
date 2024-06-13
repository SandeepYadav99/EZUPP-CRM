import React, { useMemo, useState } from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import {Tooltip, MenuItem, Typography, Autocomplete, TextField } from "@mui/material";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import styles from "../Style.module.css";
import img from "../../../../assets/img/1.png";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import {  InfoOutlined as InfoIcon } from "@mui/icons-material";
import MultiComplete from "../../../../components/FormFields/AutoCompleteText/MultiComplete";
// import { toast } from 'react-toastify';
import SnackbarUtils from "../../../../libs/SnackbarUtils";
const ProductInformation = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  image,
  listData,
  tagList,
}) => {
  const [error, setError] = useState("");
  const renderImage = useMemo(() => {
    return (
      <File
        max_size={5 * 1024 * 1024}
        type={["jpg", "png", "jpeg"]}
        fullWidth={true}
        name="image"
        accept={"image/*"}
        show_image={true}
        error={errorData?.image}
        value={form?.image}
        default_image={image ? image : ""}
        onChange={(file) => {
          if (file) {
            changeTextData(file, "image");
          }
        }}
      />
    );
  }, [form?.image,changeTextData]);
  console.log(form, "Form");
  return (
    <>
      <ShadowBox className={styles.product}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"title"} className={"heading"}>
              Product Information
            </Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={`${styles.count}`} style={{ margin: "14px 10px 0 14px" }}>
            {renderImage}
            <div className={styles.headerFlex}>
            <Typography variant="subtitle3" className={styles.imgText}>
              Image Guide
            </Typography>
            <Tooltip title={ <>
        <span>Resolution: 500px * 500px</span>
        <br />
        <span>Image size: 5 mb</span>
      </>} aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
            </div>
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Product Name"}
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
                  isError={errorData?.code}
                  errorText={errorData?.code}
                  label={"Product Code"}
                  value={form?.code}
                  onTextChange={(text) => {
                    changeTextData(text, "code");
                  }}
                  onBlur={() => {
                    onBlurHandler("code");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.type}
                  errorText={errorData?.type}
                  label={"Product Type"}
                  value={form?.type}
                  handleChange={(value) => {
                    changeTextData(value, "type");
                  }}
                  // className={styles.custonCSS}
                >
                  <MenuItem value="SERVICE">SERVICE</MenuItem>
                  <MenuItem value="PRODUCT">PRODUCT</MenuItem>
                  <MenuItem value="OTHER">OTHER</MenuItem>
                </CustomSelectField>
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.product_link}
                  errorText={errorData?.product_link}
                  label={"Product Link"}
                  value={form?.product_link}
                  onTextChange={(text) => {
                    changeTextData(text, "product_link");
                  }}
                  onBlur={() => {
                    onBlurHandler("product_link");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                {/* <Autocomplete
                  isError={errorData?.tags}
                  errorText={errorData?.tags}
                  multiple
                  id="tags-outlined"
                  options={tagList ? tagList : []}
                  value={form?.tags}
                  getOptionLabel={(option) => option}
                  onChange={(e, value) => {
                    changeTextData(value, "tags");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Associate Tags"
                    />
                  )}
                /> */}
                  <MultiComplete
                    isError={errorData?.tags}
                    multiple
                    isArray
                    AutoCompleteList={tagList ? tagList : []}
                    getOptionLabel={(option) => option}
                    label="Associate Tags"
                    defaultValue={form?.tags}
                    value={form?.tags}
                    onTextChange={(text) => {
                      changeTextData(text, "tags");
                    }}
                  />
              </div>
            </div>
            <div className={`formFlex ${styles.space}`}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.description}
                  errorText={errorData?.description}
                  label={"Description"}
                  multiline
                  rows="3"
                  onTextChange={(text) => {
                    changeTextData(text, "description");
                  }}
                  onBlur={() => {
                    onBlurHandler("description");
                  }}
                  className={styles.desc}
                />
              </div>
            </div>
          </div>
        </div>
      </ShadowBox>
    </>
  );
};

export default ProductInformation;
