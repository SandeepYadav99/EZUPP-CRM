/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2018.
 */
import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import LoginView from "../views/Login/LoginForm/Login.view.js";
import ForgotPassword from "../views/ForgotPassword/Forgot/ForgotPassword.view.js";
import ResetPassword from "../views/ForgotPassword/ResetPassword.view.js";
import { Route, Switch } from "react-router-dom";
import HorizontalNav from "../views/HorizontalNav/HorizontalNav.js";
import DragDrop from "../views/DragDrop/DragDrop.jsx";
import ChooseAccount from "../views/ChooseAccount/ChooseAccount.js";
import SuccessPageView from "../views/PasswordSucessful/SucessPage.view.js";

const App = () => {
  return <div> hi</div>;
};
const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={LoginView} />
    <Route path={"/forgot/password"} component={ForgotPassword} />
    <Route path={"/reset/password"} component={ResetPassword} />
    <Route path={"/tester"} component={HorizontalNav} />
    <Route path={"/drag"} component={DragDrop} />
    <Route path={"/already"} component={ChooseAccount} />
    <Route path={"/password/resend"} component={SuccessPageView} />

    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
