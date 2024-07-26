import React from "react";
import styles from "./Style.module.css";
import {  IconButton, Typography } from "@mui/material";
import DashboardSnackbar from "../../../components/Snackbar.component";
import Slide from "@mui/material/Slide";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";
import useFirstResetPassowrd from "./FirstResetPassword.hook";
import CustomTextField from "../../../FormFields/TextField.component";

import logoImage from "../../../assets/CRMAssets/ezupp_login_logo.png";

import { useTheme } from "@mui/styles";


const FirstResetPassowrd = ({ handleClose, open, email }) => {
  const theme = useTheme()
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    errorData,
    showConfirmPassword,
    showPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleReturn,
    UserName,
    emailDataName,
  } = useFirstResetPassowrd({ handleClose, open, email });

  const renderForm = () => {
    return (
      <>
        <div>
          <div className={styles.logoImageData}>
            <img src={logoImage} alt="text_data" style={{ width: "250px" }} />
          </div>
          <div
          className={styles.firstLoginContainer}
           
          >
            <span className={styles.headingText}>
              You have been invited to Ezupp CRM!
            </span>
          </div>
       
          <div className={styles.alignInRowData}>
            <Typography variant={"subtitle1"} >{UserName} </Typography>

            <Typography variant={"body1"}>{emailDataName}</Typography>
          </div>
          <div className={styles.underlineData}></div>
          <div>
           <div className={styles.resetText}>
            <Typography variant={"h4"} sx={{color:theme?.palette?.text?.primary}}>
              Set up password for your account{" "}
            </Typography>

           </div>
           
            <CustomTextField
              fullWidth={true}
              name="password"
              size="small"
              isError={errorData?.password}
              errorText={errorData?.password}
              type={showPassword ? "text" : "password"}
              margin={"dense"}
              label="New Password"
              value={form?.password}
              onTextChange={(text) => {
                changeTextData(text, "password");
              }}
              onBlur={() => {
                onBlurHandler("password");
              }}
            />
            <IconButton
              className={styles.visibleIcon}
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>

            <div style={{ marginTop: "8px" }}>
              <CustomTextField
                isError={errorData?.confirm_password}
                errorText={errorData?.confirm_password}
                fullWidth={true}
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                margin={"dense"}
                label="Re-enter New Password"
                value={form?.confirm_password}
                onTextChange={(text) => {
                  changeTextData(text, "confirm_password");
                }}
                onBlur={() => {
                  onBlurHandler("confirm_password");
                }}
              />
              <IconButton
                // style={{ marginLeft: "-30px" }}
                className={styles.visibleIcon}
                onClick={toggleConfirmPasswordVisibility}
              >
                {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "15px",
                marginTop: "30px",
              }}
              className={styles.mobileRender}
            >
              <ArrowPrimaryButton onClick={handleSubmit}>
                <Typography variant=" body1">SET NEW PASSWORD</Typography>
              </ArrowPrimaryButton>
              <div>
                <span className={styles.bottomSignup}>
                  {/* <ButtonBase
                    onClick={handleReturn}
                    className={styles.back}
                    id={styles.forgotBtn}
                  >
                    <img src={backArrow} alt="backtext" />
                    <Typography variant={"caption"}>Back To Login</Typography>
                  </ButtonBase>{" "} */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.mainLoginView}></div>
      <div className={styles.container}>
        <div className={styles.loginFlex2}>{renderForm()}</div>
        <DashboardSnackbar />
      </div>
    </>
  );
};

export default FirstResetPassowrd;
