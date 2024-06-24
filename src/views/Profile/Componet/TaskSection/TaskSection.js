import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import TaskListItem from "../../TaskListView";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { useTheme } from "@mui/styles";

const TaskSection = ({
  filterValue,
  filterCompltedTask,
   taskLists,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {
  const theme = useTheme()

  return (
    <ShadowBox width={"100%"}>
      <div>
        <div className={styles.upperFlex}>
          <Typography variant="h4" fontWeight={600} color={theme.palette.text.primary}>Tasks Lists</Typography>
          <div className={"myprofile"}>
            <CustomSelectField
            // name={"ALL"}
            //   disableUnderline
              value={filterValue}
              handleChange={filterCompltedTask}
            >
              <MenuItem value={"PENDING"}>Pending</MenuItem>
              <MenuItem value={"COMPLETED"}>Completed</MenuItem>
              <MenuItem value={"ALL"}>All</MenuItem>
            </CustomSelectField>
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
