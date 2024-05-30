import { ButtonBase, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import React, { useState } from "react";

const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
  
}) => {

  const handleButtonClick = () => {
    if (details?.is_completed) {
      completedHandler();
    } else {
      markAsCompleted();
    }
    // setIsCompleted(!isCompleted);
  };
  return (
  
      <div className={styles.headerTitle}>
        <Typography fontSize={18} color={"#636578"} fontWeight={600} >{details?.title}</Typography>
        <div className={styles.complte}>
        <div  className={`${styles.transition} ${
          details?.is_completed ? styles.completed : styles.markComplete
        }`}>
        <ButtonBase onClick={handleButtonClick}>
          <Check fontSize={"small"} />
          <span>{details?.is_completed ? " Completed" : "Mark as Complete"}</span>
        </ButtonBase>
      </div>
        </div>
      </div>
   
 
  );
};

export default React.memo(TaskDetailHeader);
