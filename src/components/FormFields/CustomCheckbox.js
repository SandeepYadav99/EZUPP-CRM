import {Checkbox, FormControlLabel} from "@mui/material";
import React from "react";


const CustomCheckbox = ({ handleChange, label, ...rest }) => {
    return (
        <FormControlLabel
            control={<Checkbox
                onChange={(e) => { handleChange(e.target.checked) } }
            />}
            label={label}
            {...rest}
        />);
}

export default CustomCheckbox;
