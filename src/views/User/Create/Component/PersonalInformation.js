import React,{memo} from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem, Tooltip, Typography } from "@mui/material";
import CustomPhoneContactField from "../../../../FormFields/CustomPhoneContact.componet";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import styles from "../Style.module.css";

import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { useTheme } from "@mui/styles";

import ImageInfoToolTip from "../../../../components/ImageInfo/ImageInfo";

const PersonalInformation = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  image,
  listData,
  userId,
  id,
}) => {
  const theme = useTheme();
  return (
 
      <ShadowBox width={"100%"} >
        <Typography
          variant="h4" fontWeight={600} color={theme.palette.text.primary} 
          sx={{
            marginTop:theme.spacing(3),
            marginBottom:theme.spacing(3),
            [theme.breakpoints.down("sm")]: {
              margin: "auto",
            },
          }}
        >
          Personal Information
        </Typography>

        <div className={styles.outerFlex}>
          <div className={styles.count}>
            <File
              style={{ margin: "auto" }}
              max_size={5 * 1024 * 1024}
              type={["jpg", "png", "jpeg"]}
              fullWidth={true}
              name="image"
              accept={"image/*"}
              label="Profile"
              // link={""}
              // bannerLabel
              banner={true}
              cirularBanner={true}
              error={errorData?.image}
              value={form?.image}
              default_image={image ? image : ""}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
                }
              }}
            />
            <div className={styles.imageGuide}>
              <ImageInfoToolTip
                title={"Image Guide"}
                resolution={
                  <div className={styles.new_line}>
                    <div> Resolution 500px * 500px</div>

                    <div>Image size = 5MB</div>
                  </div>
                }
              />
            </div>
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Full Name"}
                  value={form?.name}
                  onTextChange={(text) => {
                    changeTextData(text, "name");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("name");
                  // }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.userName}
                  errorText={errorData?.userName}
                  label={"User Name"}
                  value={form?.userName}
                  onTextChange={(text) => {
                    changeTextData(text, "userName");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("userName");
                  // }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.email}
                  errorText={errorData?.email}
                  label={"Email ID"}
                  value={form?.email}
                  onTextChange={(text) => {
                    changeTextData(text, "email");
                  }}
                  onBlur={() => {
                    onBlurHandler("email");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomPhoneContactField
                  isError={errorData?.contact}
                  errorText={errorData?.contact}
                  value={form?.contact}
                  onTextChange={(text) => {
                    changeTextData(text, "contact");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.role}
                  errorText={errorData?.role}
                  label={"Role"}
                  disabled={userId === id ? true : false}
                  value={form?.role}
                  handleChange={(value) => {
                    changeTextData(value, "role");
                  }}
                  className={styles.custonCSS}
                >
                  {listData?.ROLES?.map((role) => (
                    <MenuItem value={role?.id} key={role?.id}>{role?.name}</MenuItem>
                  ))}
                  {/* <MenuItem value={"OWNER"}>Owner</MenuItem> */}
                </CustomSelectField>
              </div>
              <div className={"formGroup"}>
                {id ? (
                  <CustomSelectField
                    isError={errorData?.status}
                    errorText={errorData?.status}
                    label={"Status"}
                    // disabled={userId === id ? true : false}
                    value={form?.status}
                    handleChange={(value) => {
                      changeTextData(value, "status");
                    }}
                    className={styles.custonCSS}
                  >
                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                    <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                    <MenuItem value={"DELETED"}>Deleted</MenuItem>
                    <MenuItem value={"SUSPENDED"}>Suspended</MenuItem>
                  </CustomSelectField>
                ) : (
                  <CustomSelectField
                    isError={errorData?.status}
                    errorText={errorData?.status}
                    label={"Status"}
                    // disabled={userId === id ? true : false}
                    value={form?.status}
                    handleChange={(value) => {
                      changeTextData(value, "status");
                    }}
                    className={styles.custonCSS}
                  >
                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                    <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                  </CustomSelectField>
                )}
              </div>
            </div>
          </div>
        </div>
      </ShadowBox>
  );
};

export default memo(PersonalInformation);
