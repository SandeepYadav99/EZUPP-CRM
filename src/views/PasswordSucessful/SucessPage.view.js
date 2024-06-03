/**
 * Created by charnjeetelectrovese@gmail.com on 12/13/2018.
 */
import React from "react";
import styles from "./Style.module.css";
import DashboardSnackbar from "../../components/Snackbar.component";
import classNames from "classnames";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";
import googleImageContainer from "../../assets/CRMAssets/google_neutral.png";
import csx from "classnames";
import {
  MenuItem,
  Button,
  IconButton,
  ButtonBase,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useSuccessPage from "./SucessPage.hook";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import CustomCheckBox from "../../components/FormFields/CustomCheckbox";
import { ArrowPrimaryButton } from "../../components/Buttons/PrimaryButton";
import ResetPasswordImage from "../../assets/Assets/reset_password_email@2x.png";

function SuccessPageView() {
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
  } = useSuccessPage();

  return (
    <div className={"login"}>
      <div className={styles.overlay}></div>
      <div className={styles.mainLoginView}></div>
      <div className={styles.container}>
        <div className={styles.loginFlex2}>
          <div className={styles.logoImageData}>
            <img src={logoImage} alt="text_data" style={{ width: "250px" }} />
          </div>
          <div className={styles.midImageContainer}>
            <img src={ResetPasswordImage} className={styles.imageadjust} />
          </div>
          <div className={styles.signContainer}>
            <span className={styles.headingText}>
              Reset Password email sent successfully!
            </span>
            <br />
            <div className={styles.text}>
              <div>
                We have successfully sent the reset password email to
                <b className={styles.fontAdjustWeight}>abhishek02@gmail.com.</b>
              </div>
              <div> Please check your email for further instructions.</div>
            </div>
            <br />
          </div>
          <div className={styles.alignCenterButton}>
            <ArrowPrimaryButton onClick={handleSubmit}>
              <Typography variant=" body1">LOGIN</Typography>
            </ArrowPrimaryButton>
          </div>
        </div>
        <DashboardSnackbar />
      </div>
    </div>
  );
}

export default SuccessPageView;
