import { ButtonBase, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import React, { useState } from "react";
import { useTheme } from "@mui/styles";

const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
}) => {
  const theme = useTheme();
  const handleButtonClick = () => {
    if (details?.is_completed) {
      completedHandler();
    } else {
      markAsCompleted();
    }
  };
  return (
    <div className={styles.headerTitle}>
      <Typography
        variant="h3"
        fontWeight={600}
        color={theme.palette.text.primary}
      >
        {details?.title}
      </Typography>
      <div className={styles.complte}>
        <div
          className={`${styles.transition} ${
            details?.is_completed ? styles.completed : styles.markComplete
          }`}
        >
          <ButtonBase onClick={handleButtonClick}>
            <Check fontSize={"small"} />
            <span>
              {details?.is_completed ? " Completed" : "Mark as Complete"}
            </span>
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskDetailHeader);
