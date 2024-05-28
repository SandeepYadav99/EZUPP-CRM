import React from "react";
import styles from "./Forgot.module.css";
import {
  ButtonBase,
  Dialog,
  IconButton,
} from "@mui/material";
import DashboardSnackbar from "../../components/Snackbar.component";
import Slide from "@mui/material/Slide";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ActionButton,
  ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import useResetPasswordHook from "./ResetPasswordHook";
import CustomTextField from "../../FormFields/TextField.component";

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
  } = useResetPasswordHook({ handleClose, open, email });

  const renderForm = () => {
    return (
      <>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" ,  padding:"10px"}}>
            <div
              className={styles.loginSignupTextRESET}
             
            >
              Reset Password
            </div>
            <ButtonBase onClick={handleClose}>
              <Close fontSize="small" />
            </ButtonBase>
          </div>

          <div>
            <br />
            <div className={"formGroup"}>
              <CustomTextField
                fullWidth={true}
                name="password"
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
            </div>
           
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.confirm_password}
                errorText={errorData?.confirm_password}
                fullWidth={true}
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
            </div>
            <br />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding:"10px",
                width:"100%"
              }}
              className={styles.mobileRender}
            >
              <div>
                <span className={styles.bottomSignup}>
                  <ActionButton onClick={handleClose}>CANCEL</ActionButton>
                </span>
              </div>
              <ArrowPrimaryButton onClick={handleSubmit}>
                <span className={styles.newPassword}>

                SET NEW PASSWORD
                </span>
              </ArrowPrimaryButton>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.mainLoginViewReset}>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        
        fullWidth={true}
       
        PaperProps={{
          style: {
            borderRadius: '10px',
            maxWidth: '600px',
            width:  'calc(100% - 64px)',
          }
        }}
      
        
      >
        <div className={styles.formContainer}>{renderForm()}</div>
        <DashboardSnackbar />
      </Dialog>
    </div>
  );
};

export default ResetPasswordView;
