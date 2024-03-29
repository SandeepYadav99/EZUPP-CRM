import React, {useCallback, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ReactDOM from "react-dom";

const CustomTextField = ({isError, errorText, icon, label, onChange, onTextChange, inputProps,...rest }) => {

    const handleChange = useCallback((e) => {
        onChange && onChange(e);
        onTextChange && onTextChange(e.target.value);
    }, [onChange, onTextChange]);

   return (
       <TextField
           error={isError}
           helperText={errorText}
           label={label}
           InputProps={{
               startAdornment: icon ? (
                   <InputAdornment position="start">
                       {icon ? <img className={'fieldIcon'} src={icon}/> : '' }
                   </InputAdornment>
               ):'',
               ...(inputProps ? inputProps : {})
           }}
           onChange={handleChange}
           variant={'outlined'}
           margin={"dense"}
           fullWidth={true}
           {...rest}
       />
   )
}

export default CustomTextField;
