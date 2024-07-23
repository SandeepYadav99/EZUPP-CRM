import React from "react";
import styles from "./Style.module.css";
import DashboardSnackbar from "../../../components/Snackbar.component";
import classNames from "classnames";
import logoImage from "../../../assets/CRMAssets/ezupp_login_logo.png";

import { IconButton, ButtonBase, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useLoginHook from "./Login.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomCheckBox from "../../../components/FormFields/CustomCheckbox";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "@mui/styles";

function LoginView() {
  const theme = useTheme();
  const {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,

    handleForgotPassword,
    togglePasswordVisibility,
    showPassword,
    responseMessage,
    errorMessage,
  } = useLoginHook();
  console.log(theme);
  return (
    <div className={"login"}>
      <div className={styles.overlay}></div>
      <div className={styles.mainLoginView}></div>
      <div className={styles.container}>
        <div className={styles.loginFlex2}>
          <div className={styles.logoImageData}>
            <img src={logoImage} alt="text_data" style={{ width: "250px" }} />
          </div>
          <div className={styles.signContainer}>
            <div className={styles.loginHeaderText}>
              <Typography variant="h3" sx={{}}>
                Welcome to Ezupp!{" "}
              </Typography>

              <Typography
                variant={"body1"}
                sx={{ color: theme?.palette?.text?.secondary }}
              >
                Enter the details below to login to your account
              </Typography>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.formFlexGrouup}>
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
              </div>
              <div className={styles.formFlexGrouup}>

              <div className={"formGroup"}>
                <div style={{ display: "flex", marginTop: "8px" }}>
                  <CustomTextField
                    type={showPassword ? "text" : "password"}
                    isError={errorData?.password}
                    errorText={errorData?.password}
                    label={
                      <span
                        style={{
                          color: "#636578",
                          opacity: 1,
                        }}
                      >
                        Password
                      </span>
                    }
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
                </div>
              </div>
              </div>
            </div>

            <div className={styles.logFlex}>
              <div className={classNames(styles.negativeSpacing, "log")}>
                <CustomCheckBox
                  label={
                    <Typography variant={"body1"}
                    sx={{ color: theme?.palette?.text?.secondary }}>Remember Me</Typography>
                  }
                  value={form?.is_remember}
                  handleChange={(text) => {
                    changeTextData(text, "is_remember");
                  }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <span className={styles.bottomSignup}>
                  <ButtonBase
                    onClick={handleForgotPassword}
                    className={styles.forgotBtn}
                  >
                    <Typography variant={"body1"}
                    sx={{ color: theme?.palette?.primary?.main }}>
                      Forgot Password?
                    </Typography>
                  </ButtonBase>
                </span>
              </div>
            </div>

            <div className={styles.loginAction}>
              <ArrowPrimaryButton variant={"h6"} onClick={handleSubmit}>
                LOGIN
              </ArrowPrimaryButton>
            </div>

            <div className={styles.textLineMaker}>
              <div className={styles.lineMaker}></div>
              <span
                style={{
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  color: "#636578",
                }}
              >
                OR
              </span>
              <div className={styles.lineMaker}></div>
            </div>
            <div className={styles.authWrap}>
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </div>
        </div>
        <DashboardSnackbar />
      </div>
    </div>
  );
}

export default LoginView;
