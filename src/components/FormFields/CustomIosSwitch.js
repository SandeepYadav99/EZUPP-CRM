import { Switch, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";
import styled from "styled-components";

const CustomIosSwitch = ({ handleChange, label, value, ...rest }) => {
  const theme = useTheme();

  const AntSwitch = styled(Switch)(() => ({
    width: 40,
    height: 19,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        // width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(25px)',
        transition: ' 0.3s ease-out',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(23px)',
        transition: 'transform 0.3s ease-out',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.switchTheme,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: 'width 0.1s ease-in, transform 0.3s ease-out', 
      marginTop:2,
    },
    '& .MuiSwitch-track': {
      borderRadius: 34 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease-out',
    },
  }));
  
  return (
    <FormControlLabel
      control={
        <AntSwitch
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
