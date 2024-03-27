/**
 * Created by charnjeetelectrovese@gmail.com on 12/13/2018.
 */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Login.module.css";
import {
  renderTextField,
  renderOutlinedTextField,
  renderCheckbox,
  renderPasswordField,
} from "../../libs/redux-material.utils";
import { Button, withStyles, ButtonBase } from "@material-ui/core";
import { serviceLoginUser } from "../../services/index.services";
import { actionLoginUser } from "../../actions/Auth.action";
import DashboardSnackbar from "../../components/Snackbar.component";
import { Link } from "react-router-dom";
import classNames from "classnames";
import EventEmitter from "../../libs/Events.utils";
import { updateTitle } from "../../libs/general.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import logoImage from "../../assets/CRMAssets/ezupp_login_logo.png";
import googleImageContainer from "../../assets/CRMAssets/google_neutral.png";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["email", "password"];

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
  colorButton: {
    color: "black",
    backgroundColor: "white",
    padding: "10px 60px",
    minWidth: "170px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "500",
    "&:hover": {
      color: "white",
      backgroundColor: "#5f63f2",
    },
  },
};

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
      is_checked: false,
      showPassword: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleForgotPassword = this._handleForgotPassword.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  async componentDidMount() {
    updateTitle("Login");
  }

  _handleSubmit(data) {
    // this.props.actionLoginUser(
    //     {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE4NmU3Mjc2ZjAxZTI1YmM5MzExYTAiLCJ1bmlxdWVrZXkiOiJWTHhpYiIsImlhdCI6MTY0NDMzMTE4MywiZXhwIjoxNjc1ODY3MTgzfQ.VBZoNz6fAYXzp65crVZ2sNHm5D4L9T7GaZjw_enm8Bw',id:'5e186e7276f01e25bc9311a0'}
    //     )
    delete data.logged_in;
    serviceLoginUser(data).then((val) => {
      if (!val.error) {
        this.props.actionLoginUser(val.data);
      } else {
        SnackbarUtils.error("Invalid Credentials! Please verify.");
        // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        //   error: "Invalid Credentials! Please verify.",
        //   type: "error",
        // });
      }
    });
  }

  _togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  _handleChange() {
    this.setState({
      is_checked: !this.state.is_checked,
    });
  }

  _handleForgotPassword() {
    this.props.history.push("/forgot/password");
  }

  render() {
    const { handleSubmit, classes } = this.props;
    const { showPassword } = this?.state;

    return (
      <div className={"login"}>
        <div className={styles.overlay}></div>
        <div className={styles.mainLoginView}></div>
        <div className={styles.container}>
          <div className={styles.loginFlex2}>
            <div className={styles.logoImageData}>
              <img src={logoImage} alt="text_data" />
            </div>
            <div className={styles.signContainer}>
              <span className={styles.headingText}>Welcome to Ezupp! </span>
              <br />
              <span style={{ color: "#636578" }}>
                Enter the details below to login to your account{" "}
              </span>
              <br />
              <br />
              <form onSubmit={handleSubmit(this._handleSubmit)}>
                {/*<div className={styles.loginSignupText}>Login</div>*/}
                <div>
                  <div>
                    <Field
                      fullWidth={true}
                      name="email"
                      component={renderOutlinedTextField}
                      label="E-Mail"
                    />
                  </div>
                  <br />
                  <div>
                    <div style={{ display: "flex" }}>
                      <Field
                        type={showPassword ? "text" : "password"}
                        fullWidth={true}
                        name="password"
                        component={renderOutlinedTextField}
                        label="Password*"
                        style={{
                          paddingRight: "10px !important",
                          width: "100%",
                        }}
                      />
                      <IconButton
                        style={{ marginLeft: "-30px", padding: "0px" }}
                        onClick={this._togglePasswordVisibility}
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </div>
                  </div>

                  <div className={styles.logFlex}>
                    <div className={classNames(styles.negativeSpacing, "log")}>
                      <Field
                        color={"secondary"}
                        name="logged_in"
                        component={renderCheckbox}
                        label={"Remember Me"}
                        onChange={this._handleChange}
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      {/*<span className={styles.bottomSignup}>Don't have an account ? <Link to='/signup'>Sign Up here</Link></span>*/}
                      <span className={styles.bottomSignup}>
                        <ButtonBase
                          onClick={this._handleForgotPassword}
                          className={styles.forgotBtn}
                        >
                          Forgot Password?
                        </ButtonBase>
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: "7px" }}>
                    <ButtonBase type="submit" className={styles.login}>
                      LOGIN
                    </ButtonBase>
                    {/*<Button variant={'contained'}  type="submit" className={classes.colorButton}>*/}
                    {/*    Sign In*/}
                    {/*</Button>*/}
                  </div>
                </div>
              </form>
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
}

LoginView = reduxForm({
  form: "LoginPage", // a unique identifier for this form
  validate,
  onSubmitFail: (errors) => {
    EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
      error: "Please enter Credentials",
      type: "error",
    });
  },
})(LoginView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actionLoginUser: actionLoginUser,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(LoginView));
