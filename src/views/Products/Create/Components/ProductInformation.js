import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Typography, Autocomplete, TextField } from "@mui/material";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import styles from "../Style.module.css";
import img from "../../../../assets/img/1.png";
const AutoCompleteData=[
    {
        id:1,
        title:"Ardeen Batisse",
        label:"Ardeen Batisse",
        image:img,
        email: "user1@example.com",
    },
    {
        id:2,
        title:"Justinian Hattersley",
        label:"Justinian Hattersley",
        image:img,
        email: "user2@example.com",
    },
    {
        id:1,
        title:"Graeme Yellowley",
        label:"Graeme Yellowley",
        image:img,
        email: "user3@example.com",
    },

]
const ProductInformation = ({
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
            <Typography variant= {"title"} className={"heading"}>Product Information</Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.count}  style={{ margin: "7px 10px 0 14px" }}>
          <File

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
            <Typography variant="subtitle3" className={styles.imgText}>Image Guide</Typography>
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
                  isError={errorData?.productCode}
                  errorText={errorData?.productCode}
                  label={"Product Code"}
                  value={form?.productCode}
                  onTextChange={(text) => {
                    changeTextData(text, "productCode");
                  }}
                  onBlur={() => {
                    onBlurHandler("productCode");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.role}
                  errorText={errorData?.role}
                  label={"Product Type"}
                  value={form?.role}
                  handleChange={(value) => {
                    changeTextData(value, "role");
                  }}
                  // className={styles.custonCSS}
                >
                  {listData?.ROLES?.map((role) => (
                    <MenuItem value={role?.id}>{role?.name}</MenuItem>
                  ))}

                </CustomSelectField>
              </div>
              
             
              <div className={"formGroup"}>
              <CustomTextField
                  isError={errorData?.productLink}
                  errorText={errorData?.productLink}
                  label={"Product Link"}
                  value={form?.productLink}
                  onTextChange={(text) => {
                    changeTextData(text, "productLink");
                  }}
                  onBlur={() => {
                    onBlurHandler("productLink");
                  }}
                />
              </div>
           
            </div>
            <div className={"formFlex"}>
            <div className={"formGroup"}>
            <Autocomplete
                      isError={errorData?.associateTags}
                      errorText={errorData?.associateTags}
                     multiple
                     id="tags-outlined"
                    options={AutoCompleteData ? AutoCompleteData : []}
                    getOptionLabel={(option) => option.title}
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
            className={styles.desc}/>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInformation;
