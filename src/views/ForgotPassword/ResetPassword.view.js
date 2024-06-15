import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, Dialog, IconButton, Typography } from "@mui/material";

import Slide from "@mui/material/Slide";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ActionButton,
  ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import useResetPasswordHook from "./ResetPasswordHook";
import CustomTextField from "../../FormFields/TextField.component";

import ShadowBox from "../../components/ShadowBox/ShadowBox";


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
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography variant="h4">Reset Password</Typography>

            <ButtonBase onClick={handleClose}>
              <Close fontSize="small" />
            </ButtonBase>
          </div>

          <div>
            <div className={"formGroup"}>
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
            </div>

            <div className={"formGroup"}>
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
            <div className={"formGroup"}>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "20px",
                marginTop: "20px",
               
              }}
              className={styles.mobileRender}
            >
              <ActionButton onClick={handleClose}>
                <Typography variant=" body1">CANCEL</Typography>
              </ActionButton>

              <ArrowPrimaryButton onClick={handleSubmit}>
                <Typography variant=" body1">SET NEW PASSWORD</Typography>
              </ArrowPrimaryButton>
            </div>

            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.mainLoginViewReset}>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          fullWidth={true}
          PaperProps={{
            style: {
              borderRadius: "10px",
              maxWidth: "600px",
              width: "calc(100% - 64px)",
            },
          }}
        >
          <ShadowBox width={"100%"}>
            <div className={styles.formContainer}>{renderForm()}</div>
          </ShadowBox>
        </Dialog>
      </div>
    </>
  );
};

export default ResetPasswordView;
