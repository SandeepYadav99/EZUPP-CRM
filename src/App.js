import React, {Component, useEffect} from 'react';
import {Router, Route, Switch} from "react-router-dom";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import RouteComponent from './routes/index.route';
import './App.css';
import themes, {overrides} from './themes';
import history from './libs/history.utils';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {StyledEngineProvider} from "@mui/material";
import ThemeCustomization from "./themes";

// const history = createBrowserHistory();



class App extends Component {
    render() {
        return (
            <ThemeCustomization>
                <Router history={history}>
                    <RouteComponent/>
                </Router>
            </ThemeCustomization>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    })
}

function mapStateToProps(state) {
    return {
        themeType: state.app_setting.theme,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
