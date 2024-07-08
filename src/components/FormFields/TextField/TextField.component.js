import React, { useCallback, useEffect, useState } from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const CustomTextField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  ...rest
}) => {
  const theme = useTheme();

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.target.value);
    },
    [onChange, onTextChange]
  );

  return (
    <>
      <TextField
        error={isError}
       
        helperText={
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "end",
              color: theme.palette.error.main,
              marginRight: theme.spacing(0),
            }}
          >
            {errorText}
          </Typography>
        }
        label={label}
        InputLabelProps={{
          sx: {
            color: theme.palette.text.primary,
          },
        }}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              {icon ? <img className={"fieldIcon"} src={icon} /> : ""}
            </InputAdornment>
          ) : (
            ""
          ),
          ...(inputProps ? inputProps : {}),
          sx: {
            color: theme.palette.text.primary,
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
          },
        }}
        onChange={handleChange}
        variant={"outlined"}
        // color={"primary"}
        size={"small"}
        // margin={"dense"}
        fullWidth
        {...rest}
      />
    </>
  );
};

export default CustomTextField;
