/**
 * Created by charnjeetelectrovese@gmail.com on 12/13/2018.
 */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import styles from "./Forgot.module.css";
import {
  renderTextField,
  renderOutlinedTextField,
} from "../../libs/redux-material.utils";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Button, withStyles, ButtonBase } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { serviceForgotPassword } from "../../services/index.services";
import DashboardSnackbar from "../../components/Snackbar.component";
import { Link } from "react-router-dom";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";

import EventEmitter from "../../libs/Events.utils";
import { updateTitle } from "../../libs/general.utils";
import backArrow from "../../assets/CRMAssets/ic_back.png";
import arrowIcon from "../../assets/CRMAssets/ic_arrow_white.png";


const validate = (values) => {
  const errors = {};
  const requiredFields = ["email"];

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

class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
      open: false,
      is_sent: false,
      is_calling: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleLoginClick = this._handleLoginClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
    this._handleBack = this._handleBack.bind(this);
  }

  async componentDidMount() {
    updateTitle("Forgot Password");
  }

  _handleLoginClick() {
    this.props.history.push("/login");
  }

  _handleBack() {
    this.props.history.goBack();
  }

  _handleSubmit(data) {
    if (!this.state.is_calling) {
      this.setState({
        is_calling: true,
      });
      serviceForgotPassword(data).then((val) => {
        if (!val.error) {
          EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
            error: "Password Reset Email Sent",
            type: "success",
          });
          this.setState({
            is_sent: true,
            is_calling: false,
          });
        } else {
          this.setState({
            is_calling: false,
          });
          EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
            error: "Invalid Email Address",
            type: "error",
          });
        }
      });
    }
  }

  _handleClose() {
    this.setState({
      open: !this.state.open,
    });
  }

  _handleReturn() {
    this.props.history.push("/login");
  }

  _renderForm() {
    const { handleSubmit } = this.props;
    const { is_sent } = this.state;
    if (is_sent) {
      return (
        <>
          <div></div>
          <div className={styles.signContainer}>
            <div>
              <div
                className={styles.loginSignupText}
                style={{ fontWeight: "700", fontSize: "24px" }}
              >
                Reset Email Sent.
              </div>
              <p className={styles.bottomLine} style={{ lineHeight: "18px" }}>
                Check your email for a link to reset your password. If it
                doesn’t appear within a few minutes, check your spam folder.
              </p>
              <div>
                <br />
                <ButtonBase
                  className={styles.login}
                  onClick={this._handleReturn}
                >
                  Return to sign in
                </ButtonBase>
              </div>
            </div>
          </div>
          <div></div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.signContainer}>
            <form onSubmit={handleSubmit(this._handleSubmit)}>
              <div className={styles.logoImageData}>
                <img src={logoImage} alt="text_data" style={{width:"250px"}}/>
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
                {/*<ArrowBack onClick={this._handleBack}>*/}
                {/*</ArrowBack>*/}
                <div className={styles.headingTextBig}>Forgot Password ?</div>
              </div>
              <p className={styles.bottomLine} style={{ color: "grey",fontSize:"14px" }}>
                Enter your email and we'll send you instructions to reset your
                password
              </p>
              <div>
                <br />
                <div>
                  <Field
                    fullWidth={true}
                    name="email"
                    component={renderOutlinedTextField}
                    label="E-Mail*"
                  />
                </div>
                {/*<span style={{float:'right',marginTop:'5px'}}><Link to='/login'>Back To Login</Link></span>*/}
                <br />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className={styles.mobileRender}
                >
                  <ButtonBase
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
                      <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                      <span>
                        SEND RESET LINK
                      </span> 
                      <img src={arrowIcon} alt="arrow" style={{height:"15px"}}/>
                      </div>
                    )}
                  </ButtonBase>
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
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <>
        <div className={styles.overlay}></div>
        <div className={styles.mainLoginView}>
          {/* <div className={styles.loginFlex1}>
          <img src={require("../../assets/img/logo.png")} />
        </div> */}
          {/* <div className={styles.loginFlex2}>{this._renderForm()}</div>
        <DashboardSnackbar /> */}
        </div>
        <div className={styles.container}>
          <div className={styles.loginFlex2}>{this._renderForm()}</div>
          <DashboardSnackbar />
        </div>
      </>
    );
  }
}

ForgotPasswordView = reduxForm({
  form: "LoginPage", // a unique identifier for this form
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
      } else {
      }
    } else {
    }
  },
})(ForgotPasswordView);

export default connect(null, null)(withStyles(useStyles)(ForgotPasswordView));
