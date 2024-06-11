import { Switch, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";
import styled from "styled-components";

const CustomIosSwitch = ({ handleChange, label, value, ...rest }) => {
  const theme = useTheme();
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({}) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: theme.palette.contact,

        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.switchTheme,
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.text.primary,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#00000029",
      opacity: 1,
    },
  }));
  return (
    <FormControlLabel
      control={
        <IOSSwitch
          sx={{ m: 1 }}
          checked={value ? true : false}
          onChange={(e) => handleChange(e.target.checked)}
        />
      }
      label={label}
      {...rest}
    />
  );
};

export default CustomIosSwitch;
