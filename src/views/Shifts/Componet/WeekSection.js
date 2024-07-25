import React from "react";
import styles from "./Style.module.css";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

const WeekSection = () => {
  const theme = useTheme();

  return (
    <div className={styles.mainContainer}>
      {" "}
      <div className={styles.radioFlex}>
        <div className={styles.radioButtonUnSelected} />
        <Typography variant="body1" color={theme.palette.text.primary}>
          Week off{" "}
        </Typography>
      </div>
      <div className={styles.radioFlex}>
        <div className={styles.radioButtonUnCircle} />
        <Typography variant="body1" color={theme.palette.text.primary}>
          Occasional Working
        </Typography>
      </div>
      <div className={styles.radioFlex}>
        <div className={styles.radioButtonSelected} />
        <Typography variant="body1" color={theme.palette.text.primary}>
          Working Day
        </Typography>
      </div>
    </div>
  );
};

export default WeekSection;
