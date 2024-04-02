import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ReactDOM from "react-dom";
import { Search } from '@mui/icons-material';
const CustomTextField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  iconStart,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.target.value);
    },
    [onChange, onTextChange]
  );

  return (
    <TextField
      error={isError}
      helperText={errorText}
      label={label}
      InputProps={{
        startAdornment: iconStart ? (
          <InputAdornment position="start">
            {iconStart === "search" ? (
              <Search />
            ) : (
              <img className={"fieldIcon"} src={icon} alt="icon" />
            )}
          </InputAdornment>
        ) : (
          ""
        ),
        endAdornment: icon ? (
          <InputAdornment position="end">
            {icon === "search" ? (
              <Search />
            ) : (
              <img className={"fieldIcon"} src={icon} alt="icon" />
            )}
          </InputAdornment>
        ) : (
          ""
        ),
        ...(inputProps ? inputProps : {}),
      }}
      onChange={handleChange}
      variant={"outlined"}
      margin={"dense"}
      fullWidth={true}
      {...rest}
    />
  );
};

export default CustomTextField;
