import React, { useCallback, useEffect, useState } from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    endAdornment: {
        backgroundColor: '#f5f5f5',
        color: theme.palette.text.primary,
        borderLeftWidth: '1px',
        borderLeftColor: theme.palette.grey[300],
        borderLeftStyle: 'solid',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: "100%",
        minWidth: "4em",
        padding: '0 8px', // adjust as needed
    },
    inputRoot: {
        overflow: 'hidden'
    },
    input: {
        paddingRight: '40px', // adjust based on the width of your adornment
    }
}));

const CustomTextField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
                             adornText,
  ...rest
}) => {


  const theme = useTheme();
  const classes = useStyles();
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
            classes: {
                root: classes.inputRoot,
                // input: classes.input,
            },
          startAdornment: icon ? (
            <InputAdornment position="start">
              {icon ? <img className={"fieldIcon"} src={icon} /> : ""}
            </InputAdornment>
          ) : (
            ""
          ),
            endAdornment: adornText ? (
                <InputAdornment position="end" className={classes.endAdornment}>
                    {adornText}
                </InputAdornment>
            ) : "",
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
