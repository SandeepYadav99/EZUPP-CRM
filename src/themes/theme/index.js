// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //
import {
  alpha,
} from '@mui/material/styles';

const primary = "#2063CE";
const secondary = "#25CEAE";
const bgcolors = '#F7F7F9';
const bgcolors1 = '#FFFFFF';
const textColor = "#000000";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";
const border = '#E4E4E6'
const error = '#FF0000';
const disable = '#d8d8dd';//
const badgeColor= "#6d788d";
const badgeColor1="#fdb528";
const lightenRate = 7.5;
const darkenRate = 15;
const textMainColor = '#4A4A4A';
const tableHeadColor= "#F5F5F5";
const darkContent = "#F7F7F9"

const Theme = (colors) => {
  const { grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  return {
    primary: {
      main: primary,
      light: alpha(primary, 0.2),
      dark: alpha(primary, 0.9),
      hover: alpha(secondary, 0.9),
      disabled: grey[3]
    },
    error: {
      main: error,
      light: alpha(error, 0.2),
      dark: alpha(error, 0.9)
    },
    bgColor: {
      main: bgcolors1,
      light: alpha(bgcolors, 0.5),
      dark: alpha(bgcolors, 0.9)
    },
    textColor: textColor,
    secondary: {
      main: secondary,
      light: alpha(secondary, 0.5),
      dark: alpha(secondary, 0.9),
      contrastText: "#FFFFFF"
    },
    warning: {
      main: warning,
      light: alpha(warning, 0.5),
      dark: alpha(warning, 0.9)
    },
    status: {
      high: error,
      medium: '#FF9100',
      low: '#78D90F',
      active:"#03AE85",
      business: '#888cff',
      Discuss:"#636578",
      service: "#636578",
      warm: "#EBC50B"
    },
    success: {
      main: success,
      light: alpha(success, 0.5),
      dark: alpha(success, 0.9)
    },
    info: {
      main: info,
      light: alpha(info, 0.5),
      dark: alpha(info, 0.9)
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
      error: '#ff0000',
      bright: '#FFF'
    },
    primaryButton: {
      hover: secondary,
      disabled: disable,
      disabled_text: greyColors[0]
    },
    grey: greyColors,
    badgeColor:{
      color:badgeColor,
      color1:badgeColor1,
      color2:"#ff4d49"
    },
    tableHeadColor:tableHeadColor,
    contentDark:darkContent
  };
};

export default Theme;
