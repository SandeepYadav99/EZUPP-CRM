/**
 * Created by charnjeetelectrovese@gmail.com on 3/13/2020.
 */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import styles from "./Forgot.module.css";
import {
  renderTextField,
  renderOutlinedTextField,
} from "../../libs/redux-material.utils";
import {
  ButtonBase,
  CircularProgress,
  Dialog,
  IconButton,
} from "@mui/material";
import arrowIcon from "../../assets/CRMAssets/ic_arrow_white.png";
import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import { serviceResetProfilePassword } from "../../services/index.services";
import DashboardSnackbar from "../../components/Snackbar.component";
import Slide from "@mui/material/Slide";
import EventEmitter from "../../libs/Events.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";
import {
  ActionButton,
  ArrowActionButton,
  OutlineButton,
} from "../../components/Buttons/PrimaryButton";
import { ArrowPrimaryButton } from "../../components/Buttons/PrimaryButton";
import backArrow from "../../assets/CRMAssets/ic_back.png";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ["password", "confirm_password"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.confirm_password && values.password != values.confirm_password) {
    errors.confirm_password = "Password doesn't matches";
  }
  if (values.password && values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};

const useStyles = {
  btnColor: {
    backgroundColor: "white",
    marginTop: "20px",
    paddingLeft: "20px",
    color: "#2196F3",
    marginRight: "15px",
    paddingRight: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  btnBottom: {
    backgroundColor: "white",
    paddingLeft: "20px",
    color: "#2196F3",
    marginRight: "10px",
    marginLeft: "15px",
    paddingRight: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  dialog: {
    padding: "10px 25px",
  },
};

class ResetPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
      open: false,
      is_sent: false,
      token: null,
      is_calling: false,
      success: false,
      showPassword: false,
      showConfirmPassword: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleLoginClick = this._handleLoginClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
  }

  async componentDidMount() {
    // updateTitle('Reset Password');
    //  const search = window.location.search;
    //  const params = new URLSearchParams(search);
    // const token = params.get('token');
    // if (token) {
    //     this.setState({
    //         token: token,
    //     });
    // } else {
    //     this.props.history.push('/login');
    // }
  }

  _handleLoginClick() {
    historyUtils.push("/login");
  }
  _resetForm = () => {
    const { reset } = this.props;
    reset("ResetPassword"); // Replace "ResetPassword" with your form name
  };
  _handleCloseDialog = () => {
    this._resetForm();
    this.props.handleClose();
  };
  _handleSubmit(data) {
    console.log(data, "Data");
    this.setState({
      is_calling: true,
    });
    if (!this.state.is_calling) {
      serviceResetProfilePassword({
        ...data,
        // token: this.state.token,
        email: this.props.email,
      }).then((val) => {
        this.setState({
          is_calling: false,
        });
        if (!val.error) {
          this.setState({
            success: true,
          });
          SnackbarUtils.success("Password Changed Successfully");
          // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          //   error: "Password Changed Successfully",
          //   type: "success",
          // });
          // this.props.handleClose();
          this._handleCloseDialog();
          // setTimeout(() => {
          //   historyUtils.push("/login");
          // }, 1500);
        } else {
          SnackbarUtils.error(
            "Password must contain at least one letter and one number"
          );
          //   EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          //     error: "Invalid Token",
          //     type: "error",
          //   });
        }
      });
    }
  }

  _handleClose() {
    this.setState({
      open: !this.state.open,
    });
    this._resetForm();
  }

  _handleReturn() {
    this.props.history.push("/login");
  }

  _togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  _toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  _renderForm() {
    const { handleSubmit } = this.props;
    const { showPassword, showConfirmPassword } = this.state;
    return (
      <>
        <div className={styles.signContainer}>
          <form onSubmit={handleSubmit(this._handleSubmit)}>
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
              <div className={styles.headingTextBig}>Reset Password</div>
            </div>
            <span
              className={styles.bottomLine}
              style={{ color: "grey", fontSize: "14px" }}
            >
              Your new password must be different from previously used passwords
            </span>
            <div>
              <br />
              <div>
                <div style={{ display: "flex" }}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    fullWidth={true}
                    name="password"
                    component={renderOutlinedTextField}
                    label="Password"
                  />
                  <IconButton
                    style={{ marginLeft: "-40px", padding: "0px" }}
                    onClick={this._togglePasswordVisibility}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth={true}
                    name="confirm_password"
                    component={renderOutlinedTextField}
                    label="Confirm Password"
                  />
                  <IconButton
                    style={{ marginLeft: "-40px", padding: "0px" }}
                    onClick={this._toggleConfirmPasswordVisibility}
                  >
                    {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
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
                  disabled={this.state.is_calling}
                  variant={"contained"}
                  type="submit"
                  className={styles.login}
                >
                  {this.state.is_calling ? (
                    <div style={{ padding: "5px 20px", display: "flex" }}>
                      <CircularProgress size={"18px"} color={"primary"} />
                    </div>
                  ) : (
                    "SET NEW PASSWORD"
                  )}
                </ArrowPrimaryButton>
                <div>
                  <span className={styles.bottomSignup}>
                    <ButtonBase
                      onClick={this._handleBack}
                      className={styles.back}
                    >
                      <img src={backArrow} alt="backtext" />
                      Back To Login
                    </ButtonBase>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div></div>
      </>
    );
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <>
        <div className={styles.overlay}></div>
        <div className={styles.mainLoginView}></div>
        <div className={styles.container}>
          <div className={styles.loginFlex2}>{this._renderForm()}</div>
          <DashboardSnackbar />
        </div>
      </>
    );
  }
}

ResetPasswordView = reduxForm({
  form: "ResetPassword", // a unique identifier for this form
  validate,
  onSubmitFail: (errors) => {
    if (errors) {
      const tempErrors = Object.keys(errors);
      if (tempErrors.length > 1) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Please Enter Required Parameters",
          type: "error",
        });
      } else if (tempErrors.length == 1) {
        const temp = errors[tempErrors[0]];
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: temp,
          type: "error",
        });
      } else {
      }
    } else {
    }
  },
})(ResetPasswordView);

export default connect(null, null)(withStyles(useStyles)(ResetPasswordView));
