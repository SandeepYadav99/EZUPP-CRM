import {Checkbox, FormControlLabel} from "@mui/material";
import React from "react";


const CustomCheckbox = ({ handleChange, label, value,...rest }) => {
    return (
        <FormControlLabel
            control={<Checkbox
                checked={value ? true : false}
                onChange={(e) => { handleChange(e.target.checked) } }
            />}
            label={label}
            {...rest}
        />);
}

export default CustomCheckbox;
