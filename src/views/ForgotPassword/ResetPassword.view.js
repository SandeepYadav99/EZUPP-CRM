import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, Dialog, IconButton, Typography } from "@mui/material";
import DashboardSnackbar from "../../components/Snackbar.component";
import Slide from "@mui/material/Slide";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import useResetPasswordHook from "./ResetPasswordHook";
import CustomTextField from "../../FormFields/TextField.component";
import backArrow from "../../assets/CRMAssets/ic_back.png";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";


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
        <div className={styles.logoImageData}>
            <img src={logoImage} alt="text_data" style={{ width: "250px" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className={styles.headingText}>Reset Password </span>
          </div>
          <Typography variant={"login1"}>
            Your new password must be different from previously used passwords.
          </Typography>

          <div>
            <br />
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
                // style={{ marginLeft: "-30px" }}
                className={styles.visibleIcon}
                onClick={toggleConfirmPasswordVisibility}
              >
                {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "15px",
                marginTop:"30px",
              }}
              className={styles.mobileRender}
            >
              <ArrowPrimaryButton onClick={handleSubmit}>
                <Typography variant=" body1">SET NEW PASSWORD</Typography>
              </ArrowPrimaryButton>
              <div>
                <span className={styles.bottomSignup}>
                  <ButtonBase
                    onClick={handleReturn}
                    className={styles.back}
                    id={styles.forgotBtn}
                  >
                    <img src={backArrow} alt="backtext" />
                    <Typography variant={"caption"}>Back To Login</Typography>
                  </ButtonBase>{" "}
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

export default ResetPasswordView;
