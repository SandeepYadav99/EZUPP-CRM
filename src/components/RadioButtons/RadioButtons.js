import React from "react";
import {FormControlLabel, Radio, Typography,} from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Style.module.css";
import {useTheme} from "@mui/styles";
import csx from 'classnames';

const RadioButtons = ({title, checked, handleChange, value, cardStyle, iconComp}) => {
    const theme = useTheme();
    return (
        <>
            <Box
                border={1}
                sx={{
                    display: 'flex',
                    borderRadius: theme.spacing(1),
                    padding: theme.spacing(1),
                    borderColor: checked ? `${theme.palette.primary.main}` : "#D8D8DD",
                    cursor: 'pointer'
                }}
                // width="100%"
                // alignItems={'center'}
                className={csx(styles.card, cardStyle ? cardStyle : {})}
                onClick={() => {
                    handleChange && handleChange(value)
                }}
            >
                <div className={styles.cardContent}>
                    <div>
                        {iconComp}
                    </div>
                    <div>
                        <Typography variant="body3" className="title">
                            {title}
                        </Typography>
                    </div>
                    <div>
                        <Radio sx={{padding: 0,}} checked={checked} onChange={() => {
                            // handleChange && handleChange(value)
                        }} size="small" value={value}/>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default RadioButtons;
