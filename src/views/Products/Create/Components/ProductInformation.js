import React, { useMemo } from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Typography, Autocomplete, TextField } from "@mui/material";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import styles from "../Style.module.css";
import img from "../../../../assets/img/1.png";
const AutoCompleteData = [
  {
    id: 1,
    title: "Ardeen Batisse",
    label: "Ardeen Batisse",
    image: img,
    email: "user1@example.com",
  },
  {
    id: 2,
    title: "Justinian Hattersley",
    label: "Justinian Hattersley",
    image: img,
    email: "user2@example.com",
  },
  {
    id: 1,
    title: "Graeme Yellowley",
    label: "Graeme Yellowley",
    image: img,
    email: "user3@example.com",
  },
];
const ProductInformation = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  image,
  listData,
}) => {
  const renderImage = useMemo(()=>{
    return  <File
    max_size={2 * 1024 * 1024}
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
  },[form?.image])
  console.log(form, "Form");
  return (
    <>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"title"} className={"heading"}>
              Product Information
            </Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.count} style={{ margin: "7px 10px 0 14px" }}>
           {renderImage}
            <Typography variant="subtitle3" className={styles.imgText}>
              Image Guide
            </Typography>
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
                <Autocomplete
                  isError={errorData?.tags}
                  errorText={errorData?.tags}
                  multiple
                  id="tags-outlined"
                  options={AutoCompleteData ? AutoCompleteData : []}
                  value={form?.tags}
                  getOptionLabel={(option) => option.title}
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
      </div>
    </>
  );
};

export default ProductInformation;
