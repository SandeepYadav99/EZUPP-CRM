import {  Typography } from "@mui/material";
import React, { memo } from "react";
import RouteName from "../../../../routes/Route.name";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";
import { useTheme } from "@mui/styles";
import associatedStyles from "./Styles.module.css";
const TaskAssignedContainer = ({ styles, details, classes }) => {
  const theme = useTheme();
  return (
    <div className={styles.mainFlex1}>
      <div className={associatedStyles.completedTask}>
        <Typography variant="subtitle1">Task assigned on:</Typography>
        <Typography variant="h6" sx={{color: theme?.palette.text?.secondary}}>
          {details?.assignedOnDetailText}
        </Typography>
      </div>
      <div className={associatedStyles.completedTask}>
        <Typography variant="subtitle1">Task completed on:</Typography>
        <Typography variant="h6" sx={{color: theme?.palette.text?.secondary}}>{details?.completedOnText}</Typography>
      </div>

      <div className={styles.hrline} />
      <div>
        <Typography
          variant="subtitle1"
          sx={{ ml: theme.spacing(1.5), mt: theme.spacing(2) }}
        >
          Associated User
        </Typography>
        <div className={associatedStyles.userInfoAssociated}>
          <img
            height={36}
            width={36}
            src={details?.associatedUser?.image}
            alt=""
            crossOrigin="anonymous"
          />

          <Typography variant="subtitle1" fontWeight={600}>
            {capitalizeFirstLetter(details?.associatedUser?.name)}
          </Typography>
        </div>
      </div>
      <div>
        <Typography
          variant="subtitle1"
          sx={{ ml: theme.spacing(1.5), mt: theme.spacing(2) }}
        >
          Associated Task
        </Typography>
        <div className={associatedStyles.userInfoAssociated}>
          {details?.associatedTask?.title ? (
            <a
              href={`${RouteName.TASK_DETAIL}${details?.associatedTask?._id}`}
             
            >
              {details?.associatedTask?.title}
            </a>
          ) : (
            "N/A"
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TaskAssignedContainer);
