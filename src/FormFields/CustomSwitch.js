import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from '@mui/material/Switch';
import React from "react";


const CustomSwitch = ({ handleChange, label, value, ...rest }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={value ? true : false}
                    onChange={(e) => handleChange(e.target.checked)}
                />
            }
            label={label}
            {...rest}
        />);
}

export default CustomSwitch;
