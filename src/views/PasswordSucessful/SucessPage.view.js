import React from "react";
import styles from "./Style.module.css";
import DashboardSnackbar from "../../components/Snackbar.component";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";
import {
  Typography,
} from "@mui/material";
import useSuccessPage from "./SucessPage.hook";
import { ArrowPrimaryButton } from "../../components/Buttons/PrimaryButton";
import ResetPasswordImage from "../../assets/Assets/reset_password_email@2x.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function SuccessPageView() {
  const {
    handleSubmit,
   
  } = useSuccessPage();

  const location = useLocation();

  const AddressData = location?.state?.emailAddress;

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
            <Typography variant="h3" sx={{
              textAlign:"center",
              font: "normal normal 900 24px Arial",
              color: "#636578",
              mb:1
            }}>
              Reset Password email sent successfully!
            </Typography>
          
            <div className={styles.text}>
             
                We have successfully sent the reset password email to
                <b className={styles.fontAdjustWeight}>{AddressData}.</b><br/>
               Please check your email for further instructions.
              
            </div>
          
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
