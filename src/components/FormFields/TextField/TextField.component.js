import React, {useCallback, useEffect, useState} from "react";
import {TextField, InputAdornment} from "@mui/material";

const CustomTextField = ({isError, errorText, icon, label, onChange, onTextChange, inputProps, ...rest }) => {

    const handleChange = useCallback((e) => {
        onChange && onChange(e);
        onTextChange && onTextChange(e.target.value);
    }, [onChange, onTextChange]);

   return (
    <>
       <TextField
           error={isError}
        //    helperText={errorText}
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
           color={'primary'}
           size={'small'}
           margin={'dense'}
           fullWidth
           {...rest}
       />
       {isError && (
        <div style={{textAlign:"right", color:"red"}}>{errorText}</div>
      )}
    </>
   )
}

export default CustomTextField;
