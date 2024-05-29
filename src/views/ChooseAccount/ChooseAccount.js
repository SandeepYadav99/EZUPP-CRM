import React, { useState,useEffect } from "react";
import { Field } from "redux-form";
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
import arrowIcon from "../../assets/CRMAssets/ic_arrow_white.png";
import useAccountHook from "./ChooseAccount.hook";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import CustomCheckBox from "../../components/FormFields/CustomCheckbox";
import { ArrowPrimaryButton } from "../../components/Buttons/PrimaryButton";
import CardComponent from "./component/Card";
import {DataValue} from "./Response";

function ChooseAccount() {
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
  } = useAccountHook();

  const [state,setState] = useState([]);

  useEffect (()=>{
     setState(DataValue)
  },[state])

  console.log(state,"stata is here")

  return (
    <div className={"login"}>
      <div className={styles.overlay}></div>
      <div className={styles.mainLoginView}></div>
      <div className={styles.container}>
        <div className={styles.loginFlex2}>
          <div className={styles.logoImageData}>
            <img src={logoImage} alt="text_data" style={{ width: "280px" }} />
          </div>
          <div className={styles.signContainer}>
            <span className={styles.headingText}>Choose Your Account</span>
            <span style={{ fontSize: "14px", color: "#888888" }}>
              With Ezupp Accounts, you can keep all your stuff separate for
              different businesses.{" "}
            </span>
            <br />
            <br />
          </div>
          <div className={styles.cardsRender}>
            {
                state?.map((val,i)=>{
                    return(
                        <CardComponent value={val} key={i}/>
                    )
                })
            }
          </div>
        </div>
        <DashboardSnackbar />
      </div>
    </div>
  );
}

export default ChooseAccount;
