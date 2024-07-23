import React from "react";
import styles from "./Style.module.css";
import useForgotPasswordHook from "./ForgotPassword.hook";
import CustomTextField from "../../../FormFields/TextField.component";
import DashboardSnackbar from "../../../components/Snackbar.component";

import logoImage from "../../../assets/CRMAssets/ezupp_login_logo.png";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";

import { ButtonBase, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { ArrowBackIos } from "@mui/icons-material";

const ForgotPasswordView = () => {
  const theme = useTheme()
  const {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
   
    handleReturn,
  } = useForgotPasswordHook();

  const renderDataField = () => {
    return (
      <div className={styles.signContainer}>
        <div>
          <div className={styles.logoImageData}>
            <img src={logoImage} alt="text_data" style={{ width: "250px" }} />
          </div>
          <div
            className={styles.loginSignupText}
            style={{
              fontWeight: "600",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              color="text.secondary"
              className={styles.headingText}
            >
              Forgot Password?
            </Typography>
          </div>
          <p
            className={styles.bottomLine}
            style={{
              color: "#888888",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Enter your email and we'll send you instructions to reset your
            password
          </p>
          
          <div style={{ marginTop: "0px" }}>
            <div>
              <CustomTextField
               style={{display:"flex",alignItems:"center"}}
               size="small"
                isError={errorData?.email}
                errorText={errorData?.email}
                label={
                  <span
                    style={{
                      color: "#636578",
                    }}
                  >
                    Email ID
                  </span>
                }
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className={styles.mobileRender}
            >
              <ArrowPrimaryButton
                variant={"contained"}
                onClick={handleSubmit}
                Typography={"h6"}
              >
                SEND RESET LINK
              </ArrowPrimaryButton>
              <div>
                <span className={styles.bottomSignup}>
                  <ButtonBase
                    onClick={handleReturn}
                    // className={styles.back}
                    // id={styles.forgotBtn}
                  >
                   <ArrowBackIos fontSize={"small"} color="primary"/>
                   <Typography variant={"body1"} sx={{color:theme?.palette?.primary?.main, ml:-0.5, mt:0.3}}>Back To Login</Typography>
                  </ButtonBase>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.mainLoginView}></div>
      <div className={styles.container}>
        <div className={styles.loginFlex2}>{renderDataField()}</div>
        <DashboardSnackbar />
      </div>
    </>
  );
};

export default ForgotPasswordView;
