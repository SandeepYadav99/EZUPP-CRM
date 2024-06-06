import React from "react";
import PropTypes from "prop-types";
import { Menu as MenuIcon, MoreVert as OptionIcon } from "@mui/icons-material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { withStyles } from '@mui/styles';
import cx from "classnames";

import headerStyle from "../../assets/jss/material-dashboard-react/headerStyle.jsx";
import { actionLogoutUser } from "../../actions/Auth.action";
import { actionChangeTheme } from "../../actions/AppSettings.action";

import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";
import {createTheme, ThemeProvider} from "@mui/material/styles";
// import HeaderLinks from "./HeaderLinks";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import NotificationCard from "../NotificationCard/NotificationCard.js";
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
const defaultTheme= createTheme();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      dark: false,
      note: null,
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleLogout = this._handleLogout.bind(this);
    this._handleChangeTheme = this._handleChangeTheme.bind(this);
    this._handleNotification = this._handleNotification.bind(this);
    this._handleNoteClose = this._handleNoteClose.bind(this);
    // this.activeRoute = this.activeRoute.bind(this);
  }
  activeRoute = (routeName, otherData) => {
    if (!otherData.should_regex) {
      return routeName == this.props.location.pathname;
    }
    return routeName == this.props.location.pathname ||
      this.props.location.pathname.indexOf(routeName) > -1
      ? true
      : false;
    // return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };
  makeBrand() {
    var name = "";
    this.props.routes.map((prop, key) => {
      if (this.activeRoute(prop.path, prop)) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }

  _handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  _handleNotification = (event) => {
    this.setState({ note: event.currentTarget });
  };

  _handleClose = () => {
    this.setState({ anchorEl: null });
  };
  _handleNoteClose = () => {
    this.setState({ note: null });
  };
  _handleLogout() {
    this.props.actionLogoutUser();
    this.setState({ anchorEl: null });
  }

  _handleChangeTheme() {
    const { themeType } = this.props;
    console.log(">>>>>",this.state.dark)
    this.props.actionChangeTheme(themeType == "dark" ? "light" : "dark");
  }


  render() {
    const { classes, color, themeType ,userData,theme} = this.props;
    const { anchorEl, note } = this.state;
    const appBarClasses = cx({
      [" " + classes[color]]: color,
    });

    const palletType = this.state.dark ? "dark" : "light";
    const mainPrimaryColor = this.state.dark ? "" : "";
    const mainSecondaryColor = this.state.dark ? "" : "";
    {console.log(">>>>>",this.state.dark,themeType)}

    return (
      <ThemeProvider theme={defaultTheme}>
        <AppBar position={"static"} className={classes.appBar + appBarClasses}>
          <Toolbar className={classes.container}>
            <IconButton
                className={classes.menuButton}
                onClick={this.props.handleHeaderClick}
                color="inherit"
                aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Button href="#" className={classes.title}>
              {this.makeBrand()}
            </Button>

            <div className={classes.flexGrow}>
              {/*<Switch checked={themeType == 'dark'} onChange={this._handleChangeTheme}/> */}
            </div>
            <div>
            <IconButton 
           onClick={this._handleChangeTheme}
            >
                {themeType === "light" ? <LightModeOutlinedIcon /> : <BedtimeOutlinedIcon/>}
              </IconButton>
            {/* NightsStayOutlinedIcon */}
              <IconButton
                  aria-label="show 3 new notifications"
                  color="inherit"
                  onClick={this._handleNotification}
              >
                <Badge badgeContent={3} color="secondary">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
              <Popover
                  // id={id}
                  open={Boolean(note)}
                  anchorEl={note}
                  onClose={this._handleNoteClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
              >
                <div className={classes.innercontent} 
                style={{background:theme.palette.background.paper, color:theme.palette.text.primary}}
                >
                <NotificationCard/>
                </div>
              </Popover>
            </div>

            <div className={classes.logoImage}>
              <img src={userData?.image} height={30} width={30} style={{ borderRadius: "50%" }}
            alt="user avatar" crossOrigin="anonymous"/>
            </div>

            <div>
              <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this._handleClick}
                  style={{ color: "black" }}
              >
                <OptionIcon />
              </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this._handleClose}
              >
                {/*<MenuItem onClick={this._handleClose}>Profile</MenuItem>*/}
                {/*<MenuItem onClick={this._handleClose}>My account</MenuItem>*/}
                <MenuItem onClick={this._handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
            {/*<IconButton*/}
            {/*className={classes.appResponsive}*/}
            {/*color="inherit"*/}
            {/*aria-label="open drawer"*/}
            {/*onClick={props.handleDrawerToggle}*/}
            {/*>*/}
            {/*<Menu />*/}
            {/*</IconButton>*/}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
};

const temp = withStyles(headerStyle, {withTheme: true})(Header);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actionLogoutUser: actionLogoutUser,
      actionChangeTheme: actionChangeTheme,
    },
    dispatch
  );
}
function mapStateToProps(state) {
  return {
    themeType: state.app_setting.theme,
    userData: state?.auth?.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(temp);
