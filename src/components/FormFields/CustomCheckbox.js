import { Checkbox, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const CustomCheckbox = ({ handleChange, label, value, ...rest }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value ? true : false}
          onChange={(e) => {
            handleChange(e.target.checked);
          }}
         
        />
      }
      label={label}
      sx={{
        color:isDarkMode ? theme.palette.common.white :"inherit",
      }}
      {...rest}
    />
  );
};

export default CustomCheckbox;
