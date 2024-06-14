import { ButtonBase, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import React, { useState } from "react";
import { useTheme } from '@mui/styles';


const TaskDetailHeader = ({
  details,
  completedHandler,
  markAsCompleted,
  styles,
  
}) => {
const [isCompleted, setIsCompleted]=useState(false)
const theme = useTheme()
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
        <Typography variant='h4' fontSize={18} fontWeight={600} color={theme.palette.text.subText1}>{details?.title}</Typography>
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
