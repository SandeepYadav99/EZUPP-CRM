import { useTheme } from "@emotion/react";

import React, { useCallback } from "react";

import PhoneInput from "react-phone-input-2";
import { formatPhoneNumber } from "../hooks/CommonFunction";
import { Typography } from "@mui/material";

const CustomPhoneContactField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  value,
  inputStyle,
  isValid,
  onMount,
  ...rest
}) => {

  const theme = useTheme();
  const handleChange = useCallback(
    (value, country, e, formattedValue) => {
      const formattedPhoneNumber = formatPhoneNumber(formattedValue);
      onTextChange && onTextChange(formattedPhoneNumber);
      onChange && onChange(formattedPhoneNumber, country, e, formattedValue);
    },
    [onChange, onTextChange]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PhoneInput
        defaultErrorMessage={isError}
        inputProps={{
          name: "Phone No",
        }}
        country={"in"}
      
        value={value}
        onChange={handleChange}
        inputStyle={{
          width: "100%",
          border: errorText ? "1px solid red" : "1px solid #ccc",
          color: theme.palette.text.primary,
          background: theme.palette.contact,
          marginTop: theme.spacing(2),
        }}
        dropdownStyle={{
          backgroundColor: theme.palette.background?.paper,
        }}
        specialLabel={
          <Typography 
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.contact,
            position: "absolute",
            top: theme.spacing(0.5),
            left: theme.spacing(2),
            display: "block",
            letterSpacing:0
          }}
         
           variant="h6"
          >
            Contact
          </Typography>
        }
        isValid={isValid}
        {...rest}
      />
      {errorText ? (
        <span style={{ color: "red", textAlign: "right", fontSize: "12px" }}>
          {errorText}
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default CustomPhoneContactField;
