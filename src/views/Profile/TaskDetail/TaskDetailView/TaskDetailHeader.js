import { ButtonBase, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import React  from "react";
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
      <div className={styles.headerTypography}>
        <Typography
          variant="h5"
          fontWeight={600}
          color={theme.palette.text.primary}
          sx={{
           
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {details?.title}
        </Typography>
      </div>
      <div className={styles.complte}>
        <div
          className={`${styles.transition} ${
            details?.is_completed ? styles.completed : styles.markComplete
          }`}
        >
          <ButtonBase onClick={handleButtonClick}>
            <Check fontSize={"small"} />
            <Typography variant="h6">
              {details?.is_completed ? " Completed" : "Mark as Complete"}
            </Typography>
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskDetailHeader);
