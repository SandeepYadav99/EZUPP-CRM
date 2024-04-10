import React, {Component} from 'react';
import {Router} from "react-router-dom";


import RouteComponent from './routes/index.route';
import './App.css';

import history from './libs/history.utils';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
