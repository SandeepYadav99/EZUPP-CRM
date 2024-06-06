import { ButtonBase, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import React, { useState } from "react";


const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
  
}) => {
const [isCompleted, setIsCompleted]=useState(false)

  const handleButtonClick = () => {
    if (isCompleted) {
      // completedHandler();
      setIsCompleted(false)
    } else {
      // markAsCompleted();
      setIsCompleted(true)
    }
    // setIsCompleted(!isCompleted);
  };
  return (
  
      <div className={styles.headerTitle}>
        <Typography fontSize={18} fontWeight={600} >{details?.title}</Typography>
        <div className={styles.complte}>
        <div  className={`${styles.transition} ${
          !isCompleted ? styles.completed : styles.markComplete
        }`}>
        <ButtonBase onClick={handleButtonClick}>
          <Check fontSize={"small"} />
          <span>{!isCompleted ? " Completed" : "Mark as Complete"}</span>
        </ButtonBase>
      </div>
        </div>
      </div>
   
 
  );
};

export default React.memo(TaskDetailHeader);
