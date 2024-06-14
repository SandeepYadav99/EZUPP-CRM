import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, Dialog, IconButton, Typography } from "@mui/material";

import Slide from "@mui/material/Slide";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ActionButton,
  ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import useResetPasswordHook from "./ResetPassword.hook";
import backArrow from "../../assets/CRMAssets/ic_back.png";
import CustomTextField from "../../FormFields/TextField.component";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";
import DashboardSnackbar from "../../components/Snackbar.component";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ResetPasswordView = ({ handleClose, open, email }) => {
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
  } = useResetPasswordHook({ handleClose, open, email });

  const renderForm = () => {
    return (
      <>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className={styles.logoImageData}>
              <img src={logoImage} alt="text_data" style={{ width: "250px" }} />
            </div>
            <Typography variant="h4">Reset Password</Typography>
            <span
              className={styles.bottomLine}
              style={{
                color: "#888888",
                fontSize: "14px",
                marginTop: "5px",
                marginBottom:"20px",
              }}
            >
              Your new password must be different from previously used passwords
            </span>
          </div>

          <div>
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
          <div style={{marginTop:"8px"}}>
            <CustomTextField
              isError={errorData?.confirm_password}
              errorText={errorData?.confirm_password}
              fullWidth={true}
              size="small"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              margin={"dense"}
              label="Confirm Password"
              value={form?.confirm_password}
              onTextChange={(text) => {
                changeTextData(text, "confirm_password");
              }}
              onBlur={() => {
                onBlurHandler("confirm_password");
              }}
            />
            <IconButton
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
              <span className={styles.bottomSignup}>
                <ButtonBase
                  onClick={handleReturn}
                  className={styles.back}
                  id={styles.forgotBtn}
                >
                  <img src={backArrow} alt="backtext" />
                  <Typography variant={"caption"}>Back To Login</Typography>
                </ButtonBase>
              </span>
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

export default ResetPasswordView;
