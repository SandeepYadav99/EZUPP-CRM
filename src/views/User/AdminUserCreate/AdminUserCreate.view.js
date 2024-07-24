import React from "react";
import styles from "./Style.module.css";
import {
  CreateActionComponent,
  CreateHeadaerComponent,
} from "../../../components/CustomListHeader/CustomListHeader";
import { MenuItem, Typography } from "@mui/material";
import ImageInfoToolTip from "../../../components/ImageInfo/ImageInfo";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomPhoneContactField from "../../../FormFields/CustomPhoneContact.componet";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import useAdminUserCreateHook from "./AdminUserCreate.hook";
import { useTheme } from "@mui/styles";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import CustomFileField from "../../../components/FileField/CustomFileField";
import UploaderImage from "../../../components/FileComponent/UploaderImage.component";

const AdminUserCreate = ({}) => {
  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    handleSubmit,
    userId,
    id,
    image,
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
              <CustomFileField
                maxSize={5 * 1024 * 1024}
                type={["jpg", "png", "jpeg"]}
                name="image"
                accept={"image/*"}
                error={errorData?.image}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "image");
                  }
                }}
                value={form?.image}
                defaultImage={image}
                render={({ value, url, error, ...rest }) => (
                  <UploaderImage
                    cirularBanner
                    error={error}
                    value={value}
                    url={url}
                    default_image={image}
                    {...rest}
                  />
                )}
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
                    isError={errorData?.user_name}
                    errorText={errorData?.user_name}
                    label={"User Name"}
                    value={form?.user_name}
                    onTextChange={(text) => {
                      changeTextData(text, "user_name");
                    }}
                    // onBlur={() => {
                    //   onBlurHandler("user_name");
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
                    isError={errorData?.status}
                    errorText={errorData?.status}
                    label={"Status"}
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
                </div>

                <div className={"formGroup"}>
                  <CustomSelectField
                    isError={errorData?.role_id}
                    errorText={errorData?.role_id}
                    label={"Role"}
                    value={form?.role_id}
                    handleChange={(value) => {
                      changeTextData(value, "role_id");
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
                isError={errorData?.manager_id}
                errorText={errorData?.manager_id}
                label={"Manager"}
                className={styles.marginTop2}
                value={form?.manager_id}
                handleChange={(value) => {
                  changeTextData(value, "manager_id");
                }}
              >
                {listData?.MANAGERS?.map((item) => {
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
                  changeTextData(value, "exit_date");
                }}
                value={form?.exit_date}
                isError={errorData?.exit_date}
                errorText={errorData?.exit_date}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
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
            </div>

            <div className={"formGroup"}></div>
          </div>
          <div className={styles.checkboxAction}>
            <div className={styles.checkbox}>
              <CustomCheckbox
                sx={{ color: theme.palette.text.primary }}
                value={form?.is_manager}
                handleChange={() => {
                  changeTextData(!form?.is_manager, "is_manager");
                }}
                checked={form?.is_manager}
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
                sx={{ color: theme.palette.text.primary }}
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
                Provide login access to this staff
              </Typography>
            </div>
            {!id && (
              <div className={styles.checkbox}>
                <CustomCheckbox
                  sx={{ color: theme.palette.text.primary }}
                  checked={form?.send_email}
                  value={form?.send_email}
                  handleChange={() => {
                    changeTextData(!form?.send_email, "send_email");
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ marginLeft: theme.spacing(-2) }}
                >
                  Send Invite to user on email
                </Typography>
              </div>
            )}
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
