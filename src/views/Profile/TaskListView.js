import React from "react";
import { Checkbox, Typography } from "@mui/material";
import styles from "./Styles.module.css";
import { AccessTime, Watch } from "@mui/icons-material";
import StatusPill from "../../components/Status/StatusPill.component";

const TaskListItem = ({
  task,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#FF0000";
      case "MEDIUM":
        return "#FA8B55";
      case "LOW":
        return "#EDF9DE";
      default:
        return "#FFFFFF";
    }
  };

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
          variant="h6"
          color={"#636578"}
          fontWeight={600}
          onClick={() => handleDetailPage(task)}
        >
          {task?.title}
        </Typography>
      </div>
      <div onClick={() => handleDetailPage(task)} className={styles.detailView}>
        {/* <div className={styles.dummy}></div> */}
        <Typography variant="h6" color={"#888888"} marginLeft={"12px"} marginTop={-1}>
          {formattedDescription}
        </Typography>
        <div className={styles.taskFlex}>
          <div className={styles.timeFlex}>
            <AccessTime className={styles.contactIcons} fontSize="small" />
            <Typography variant="caption" color={"#636578"} padding={1} fontWeight={600}>
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
