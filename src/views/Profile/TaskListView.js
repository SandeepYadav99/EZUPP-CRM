import React from "react";
import { Checkbox, Typography } from "@mui/material";
import styles from "./Styles.module.css";
import { AccessTime, AccessTimeFilled, Watch } from "@mui/icons-material";
import StatusPill from "../../components/Status/StatusPill.component";
import { useTheme } from "@mui/styles";

const TaskListItem = ({
  task,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {

const theme= useTheme()
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
          {line}
          <br />
        </React.Fragment>
      ))
    : null;
  return (
    <div>
      <div className={styles.check}>
        <Checkbox
           color="primary"
          className={styles.checkbox}
          checked={task?.is_completed ? true : false}
          onClick={handleCheckboxClick}
        />
        <Typography
          variant="h5"
          fontSize={14}
          color={theme?.palette.text.subText1}
          fontWeight={600}
          onClick={() => handleDetailPage(task)}
        >
          {task?.title}
        </Typography>
      </div>
      <div onClick={() => handleDetailPage(task)} className={styles.detailView}>
        {/* <div className={styles.dummy}></div> */}
        <Typography variant="body1" color={theme?.palette.text.subText} marginLeft={"12px"} fontSize={14} marginTop={-1}>
          {formattedDescription}
        </Typography>
        <div className={styles.taskFlex}>
          <div className={styles.timeFlex}>
            <AccessTimeFilled className={styles.contactIcons} color={theme?.palette?.status.service} fontSize="small" />
            <Typography variant="caption" color={theme?.palette?.status.service} padding={1} fontWeight={600}>
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
