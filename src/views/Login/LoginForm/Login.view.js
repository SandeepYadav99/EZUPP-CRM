/**
 * Created by charnjeetelectrovese@gmail.com on 12/13/2018.
 */
import React from "react";
import { Field } from "redux-form";
import styles from "./Style.module.css";
import DashboardSnackbar from "../../../components/Snackbar.component";
import classNames from "classnames";
import logoImage from "../../../assets/CRMAssets/ezupp_login_logo.png";
import googleImageContainer from "../../../assets/CRMAssets/google_neutral.png";
import csx from "classnames";
import { MenuItem, Button, IconButton, ButtonBase } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import arrowIcon from "../../../assets/CRMAssets/ic_arrow_white.png";
import useLoginHook from "./Login.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomCheckBox from "../../../components/FormFields/CustomCheckbox";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";

function LoginView() {
  const {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    isSubmitting,
    handleForgotPassword,
    togglePasswordVisibility,
    showPassword,
  } = useLoginHook();

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
            <span className={styles.headingText}>Welcome to Ezupp! </span>
            <br />
            <span style={{ fontSize: "14px", color: "#888888" }}>
              Enter the details below to login to your account{" "}
            </span>
            <br />
            <br />
            <div>
              <div>
                <div>
                  <CustomTextField
                    isError={errorData?.email}
                    errorText={errorData?.email}
                    label={<span style={{ color: "#636578" }}>Email ID</span>}
                    value={form?.email}
                    onTextChange={(text) => {
                      changeTextData(text, "email");
                    }}
                    onBlur={() => {
                      onBlurHandler("email");
                    }}
                  />
                </div>
                <br />
                <div>
                  <div style={{ display: "flex" }}>
                    <CustomTextField
                      type={showPassword ? "text" : "password"}
                      isError={errorData?.password}
                      errorText={errorData?.password}
                      label={<span style={{ color: "#636578" }}>Password</span>}
                      value={form?.password}
                      onTextChange={(text) => {
                        changeTextData(text, "password");
                      }}
                      onBlur={() => {
                        onBlurHandler("password");
                      }}
                    />
                    <IconButton
                      style={{
                        marginLeft: "-37px",
                        padding: "0px",
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                </div>

                <div className={styles.logFlex}>
                  <div className={classNames(styles.negativeSpacing, "log")}>
                    <CustomCheckBox
                      label={
                        <span style={{ color: "#888888", fontSize: "14px" }}>
                          Remember Me
                        </span>
                      }
                      value={form?.logged_in}
                      handleChange={(text) => {
                        changeTextData(text, "logged_in");
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <span className={styles.bottomSignup}>
                      <ButtonBase
                        onClick={handleForgotPassword}
                        className={styles.forgotBtn}
                      >
                        Forgot Password?
                      </ButtonBase>
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "7px" }}>
                  <ArrowPrimaryButton onClick={handleSubmit}>
                    LOGIN
                  </ArrowPrimaryButton>
                </div>
              </div>
            </div>
            <br />
            <div className={styles.textLineMaker}>
              <div className={styles.lineMaker}></div>
              <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                OR
              </span>
              <div className={styles.lineMaker}></div>
            </div>
            <div className={styles.containerBtn}>
              <img src={googleImageContainer} alt="google-image" />
            </div>
          </div>
        </div>
        <DashboardSnackbar />
      </div>
    </div>
  );
}

export default LoginView;
