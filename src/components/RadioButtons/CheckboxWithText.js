import React from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import styles from "./Style.module.css";
import RadioTextWrapper from "./RadioTextWrapper";

const CheckboxWithText = ({
                                 title,
                                 description,
                                 checked,
                                 handleChange,
                                 value,
                                 cardStyle,
                             }) => {
    return (
        <RadioTextWrapper
            description={description}
            cardStyle={cardStyle}
            handleChange={handleChange}
            title={title}
            checked={checked}
            value={value}
            fieldComp={<FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={() => {
                            // handleChange && handleChange(value)
                        }}
                        value={value}
                        size="small"
                    />
                }
                className={styles.radio1}
            />}
        />
    );
};

export default CheckboxWithText;
