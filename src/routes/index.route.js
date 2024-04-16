/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2018.
 */
import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import LoginView from "../views/Login/LoginForm/Login.view.js";
// import Signup from '../views/Signup/Signup.view';
// import Login from "../views/Login/Login.view.js";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword.view";
import ResetPassword from "../views/ForgotPassword/ResetPassword.view";
import { Route, Switch } from "react-router-dom";
import HorizontalNav from "../views/HorizontalNav/HorizontalNav.js";

const App = () => {
  return <div> hi</div>;
};
const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={LoginView} />
    {/*/!*<Route path={'/signup'} component={Signup} />*!/*/}
    <Route path={"/forgot/password"} component={ForgotPassword} />
    <Route path={"/reset/password"} component={ResetPassword} />
    <Route path={"/tester"} component={HorizontalNav} />
    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
