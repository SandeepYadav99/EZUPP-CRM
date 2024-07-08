import React from "react";
import { Checkbox, Typography } from "@mui/material";
import styles from "./Styles.module.css";
import {  AccessTimeFilled } from "@mui/icons-material";
import StatusPill from "../../components/Status/StatusPill.component";
import { useTheme } from "@mui/styles";
import capitalizeFirstLetter from "../../hooks/CommonFunction";

const TaskListItem = ({
  task,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {
  const theme = useTheme();
  const handleCheckboxClick = async (e) => {
    if (e.target.checked) {
      await markAsCompleted(task);
    } else {
      await completedHandler(task);
    }
  };

  const formattedDescription = task?.description
    ? task.description.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {capitalizeFirstLetter(line)}
          <br />
        </React.Fragment>
      ))
    : null;
  return (
    <div className={styles.outerClick} onClick={() => handleDetailPage(task)}>
      <div className={styles.check}>
        <Checkbox
          color="primary"
          className={styles.checkbox}
          checked={task?.is_completed ? true : false}
          onClick={(e) => {
            e.stopPropagation();
            handleCheckboxClick(e);
          }}
        />
        <Typography
          variant="subtitle1"
          color={theme.palette.text.primary}
          fontWeight={600}
          sx={{
            width: "auto",
            wordBreak: "break-word",
            height: "auto",
            textOverflow: "hidden",
          }}
        >
          {capitalizeFirstLetter(task?.title)}
        </Typography>
      </div>
      <div className={styles.detailView}>
        {/* <div className={styles.dummy}></div> */}
        <Typography
          variant="body1"
          color={theme?.palette.text.secondary}
          sx={{
            ml: theme.spacing(1.8),
            width: "auto",
            wordBreak: "break-word",
            height: "auto",
            textOverflow: "hidden",
          }}
        >
          {formattedDescription}
        </Typography>
        <div className={styles.taskFlex}>
          <div className={styles.timeFlex}>
            <AccessTimeFilled
              className={styles.contactIcons}
              color={theme.palette.text.primary}
              fontSize="small"
            />
            <Typography
              variant="caption"
              color={theme.palette.text.primary}
              padding={1}
              fontWeight={600}
            >
              {task?.dueDateListText}
            </Typography>
          </div>

          <div className={styles.section}>
            <StatusPill
              status={task?.priority}
              color={task?.priority.toLowerCase()}
            />
          </div>

          <div className={styles.section}>
            {" "}
            <StatusPill status={task?.type} color={"service"} />
          </div>
        </div>
        <hr className={styles.lines} />
      </div>
    </div>
  );
};

export default React.memo(TaskListItem);
