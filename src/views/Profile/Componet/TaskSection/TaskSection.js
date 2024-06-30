import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useMemo } from "react";
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
  const theme = useTheme();

  const taskListData = useMemo(() => {
    if (taskLists && taskLists?.length > 0) {
      return taskLists?.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          handleDetailPage={handleDetailPage}
          markAsCompleted={markAsCompleted}
          completedHandler={completedHandler}
        />
      ));
    }
  }, [taskLists]);

  const isHaveTask = !taskListData;
  return (
    <ShadowBox width={"100%"}>
      <div>
        <div className={styles.upperFlex}>
          <Typography
            variant="h5"
            fontWeight={600}
            color={theme.palette.text.primary}
          >
            Task List
          </Typography>
          <div >
            <CustomSelectField
              // name={"ALL"}
              className={styles.customSelectField}
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

        {taskListData}
        {isHaveTask && (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {" "}
            Tasks is not available!
          </Typography>
        )}
      </div>
    </ShadowBox>
  );
};

export default TaskSection;
