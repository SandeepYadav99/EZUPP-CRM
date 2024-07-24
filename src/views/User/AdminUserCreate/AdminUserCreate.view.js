import React from "react";
import styles from "./Style.module.css";
import {
  CreateActionComponent,
  CreateHeadaerComponent,
} from "../../../components/CustomListHeader/CustomListHeader";
import { MenuItem, Typography } from "@mui/material";
import File from "../../../components/FileComponent/FileComponent.component";

import ImageInfoToolTip from "../../../components/ImageInfo/ImageInfo";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomPhoneContactField from "../../../FormFields/CustomPhoneContact.componet";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import useAdminUserCreateHook from "./AdminUserCreate.hook";
import { useTheme } from "@mui/styles";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";

const AdminUserCreate = ({}) => {
  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    handleSubmit,
    userId,
    id,
    images,
    manager,
    listData,
    isSubmitting,
  } = useAdminUserCreateHook();
  const theme = useTheme();

  return (
    <div className={styles.userContainer}>
      <div className={styles.outerFlex1}>
        <CreateHeadaerComponent title={id ? "Update Staff" : "Add Staff"} />
      </div>
      <ShadowBox width={"100%"}>
        <div className={styles.subContainer}>
          <Typography
            variant="h5"
            fontWeight={600}
            color={theme.palette.text.primary}
            sx={{
              marginBottom: theme.spacing(1),
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
                default_image={images ? images : ""}
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
                {id !== userId ? (
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
                ) : (
                  <div className="formGroup"></div>
                )}
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
                      <MenuItem value={role?.id} key={role?.id}>
                        {role?.label}
                      </MenuItem>
                    ))}
                  </CustomSelectField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShadowBox>
      <ShadowBox className={styles.mainBox}>
        <div className={styles.subContainer}>
          <div className={"headerFlex"}>
            <Typography
              sx={{
                marginBottom: theme.spacing(1),
                [theme.breakpoints.down("sm")]: {
                  margin: "auto",
                },
              }}
              variant="h5"
              fontWeight={600}
              color={theme.palette.text.primary}
            >
              Work Information
            </Typography>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.employee_id}
                errorText={errorData?.employee_id}
                label={"Employee ID"}
                value={form?.employee_id}
                onTextChange={(text) => {
                  changeTextData(text, "employee_id");
                }}
                // onBlur={() => {
                //   onBlurHandler("employee_id");
                // }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.manager}
                errorText={errorData?.manager}
                label={"Manager"}
                className={styles.marginTop2}
                value={form?.manager}
                handleChange={(value) => {
                  changeTextData(value, "manager");
                }}
              >
                {manager?.map((item) => {
                  return (
                    <MenuItem
                      key={item?.id}
                      value={item?.id}
                    >{`${item?.name} (${item?.employee_id})`}</MenuItem>
                  );
                })}
              </CustomSelectField>
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Joining Date"}
                onChange={(value) => {
                  changeTextData(value, "joining_date");
                }}
                // className={styles.dateContainer}
                value={form?.joining_date}
                isError={errorData?.joining_date}
                errorText={errorData?.joining_date}
              />
            </div>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                // className={styles.dateContainer}
                label={"End Date"}
                onChange={(value) => {
                  changeTextData(value, "end_date");
                }}
                value={form?.end_date}
                isError={errorData?.end_date}
                errorText={errorData?.end_date}
              />
            </div>
          </div>

          <div className={styles.checkboxAction}>
            <div className={styles.checkbox}>
              <CustomCheckbox
                sx={{ color: theme.palette.text.primary }}
                value={form?.manager_id}
                handleChange={() => {
                  changeTextData(!form?.manager_id, "manager_id");
                }}
                checked={form?.manager_id}
              />
              <Typography
                variant="body1"
                sx={{ marginLeft: theme.spacing(-2) }}
              >
                User is a manager?
              </Typography>
            </div>

            <div className={styles.checkbox}>
              <CustomCheckbox
                sx={{
                  height: "15px",
                  color: theme.palette.text.primary,
                  "& .MuiSvgIcon-root": {},
                }}
                checked={form?.invoiteToUser}
                value={form?.invoiteToUser}
                handleChange={() => {
                  changeTextData(!form?.invoiteToUser, "invoiteToUser");
                }}
              />
              <Typography
                variant="body1"
                sx={{ marginLeft: theme.spacing(-2) }}
              >
                Provide login access to this staff
              </Typography>
            </div>
            <div className={styles.checkbox}>
              <CustomCheckbox
                sx={{
                  height: "15px",
                  color: theme.palette.text.primary,
                  "& .MuiSvgIcon-root": {},
                }}
                checked={form?.is_login_access}
                value={form?.is_login_access}
                handleChange={() => {
                  changeTextData(!form?.is_login_access, "is_login_access");
                }}
              />
              <Typography
                variant="body1"
                sx={{ marginLeft: theme.spacing(-2) }}
              >
                Send Invite to user on email
              </Typography>
            </div>
          </div>
        </div>
      </ShadowBox>
      <div className={styles.saveButton}>
        <CreateActionComponent
          handleSubmit={handleSubmit}
          isRemove={false}
          isSubmitting={isSubmitting}
          title={id ? "UPDATE" : "SAVE"}
        />
      </div>
    </div>
  );
};

export default AdminUserCreate;
