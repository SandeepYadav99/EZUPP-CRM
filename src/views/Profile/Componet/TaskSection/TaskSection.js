import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import TaskListItem from "../../TaskListView";
const TaskSection = ({
  filterValue,
  filterCompltedTask,
  taskLists,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {
  return (
    <ShadowBox width={"100%"}>
     
        <div className={styles.plain}>
          <div className={styles.upperFlex}>
            <h3 className={styles.taskHeading}>Tasks Lists</h3>
            <div className={"myprofile"}>
              <FormControl variant={"outlined"} className={styles.selectWidth}>
                <Select
                  disableUnderline
                  value={filterValue}
                  onChange={filterCompltedTask}
                >
                  <MenuItem value={"PENDING"}>Pending</MenuItem>
                  <MenuItem value={"COMPLETED"}>Completed</MenuItem>
                  <MenuItem value={"ALL"}>All</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {taskLists && taskLists?.length > 0 ? (
            taskLists?.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                handleDetailPage={handleDetailPage}
                markAsCompleted={markAsCompleted}
                completedHandler={completedHandler}
              />
            ))
          ) : (
            <p className={styles.notfound}> Tasks is not available!</p>
          )}
        </div>
   
    </ShadowBox>
  );
};

export default TaskSection;
