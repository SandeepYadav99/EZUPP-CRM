import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import TaskListItem from "../../TaskListView";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
const taskLists = [
  {
    _id: "65ba32d7fb1f30fe28028455",
    category: ["CHECK", "Category"],
    is_overdue: true,
    is_completed: false,
    status: "ACTIVE",
    title: "Assign the task for FG",
    description: "STEPS TO REGENERATE\n1. Check\n2. Priority",
    due_date: "2024-01-23T16:30:00.000Z",
    type: "DISCUSS",
    priority: "HIGH",
    comment: "Task",
    createdAt: "2024-01-31T11:45:27.730Z",
    updatedAt: "2024-05-28T22:00:00.427Z",
    completed_on: null,
    assignedTo: {
      name: "Rajat singh",
      email: "31pankajkumar@gmail.com",
      image: "http://91.205.173.97:2444/public/user_images/default_user.jpg",
      employee_id: "EMP/212",
      id: "65b9fa8496aeebef1df24b88",
    },
    assignedBy: {
      name: "Pankaj kumar",
      image:
        "http://91.205.173.97:2444/public/business/1706092503596_Astral.jpg",
      employee_id: "EMP/111",
      id: "65ae5fc2bf709170e2585056",
      email: "ipankajkumarlpu@gmail.com",
    },
    associatedUser: {
      name: "vishal verma",
      email: "amanshara141998@gmail.com",
      image: "http://91.205.173.97:2444/public/user_images/default_user.jpg",
      employee_id: "fdsc324",
      id: "65926e7a653dc7bccc2565c4",
    },
    associatedTask: {
      _id: "659d116429ab27ab5c2f1033",
      category: ["New Task", "Sandeep"],
      is_overdue: true,
      is_completed: false,
      status: "ACTIVE",
      title: "Task Title is not avalable",
      description:
        "Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable Task Title is not avalable",
      due_date: "2024-01-03T09:25:00.000Z",
      type: "DISCUSS",
      priority: "HIGH",
      associated_user: "657712da34a7a5c8c79a2094",
      associated_task: "659ce7b6fb472f9640caeabe",
      comment: "Task",
      assigned_to: "659e4859f5a41a1d6a33b7da",
      assigned_by: "5e186e7276f01e25bc9311a0",
      createdAt: "2024-01-09T09:27:00.422Z",
      updatedAt: "2024-05-28T22:00:00.208Z",
      __v: 0,
      completed_on: null,
    },
    id: "65ba32d7fb1f30fe28028455",
    createdAtText: "31-01-2024",
    updatedAtText: "29-05-2024",
    dueDateText: "23/01/2024 | 10:00 PM",
    dueDateListText: "23 January 2024  10:00 PM",
    completedOnText: "N/A",
    assignedOnText: "31 January 2024  05:15 PM",
    assignedOnDetailText: "31/01/2024  | 05:15 PM",
    associateUserName: "Vishal verma",
  },

  {
    _id: "65bb34cad15ddf1f7a1b585b",
    category: ["Sandeep"],
    is_overdue: true,
    is_completed: false,
    status: "ACTIVE",
    title: "Task 3",
    description: "test",
    due_date: "2024-02-22T06:04:00.000Z",
    type: "DISCUSS",
    priority: "LOW",
    comment: "Task",
    createdAt: "2024-02-01T06:06:02.825Z",
    updatedAt: "2024-05-28T22:00:00.434Z",
    assignedTo: {
      name: "Rajat singh",
      email: "31pankajkumar@gmail.com",
      image: "http://91.205.173.97:2444/public/user_images/default_user.jpg",
      employee_id: "EMP/212",
      id: "65b9fa8496aeebef1df24b88",
    },
    assignedBy: {
      name: "Pankaj kumar",
      image:
        "http://91.205.173.97:2444/public/business/1706092503596_Astral.jpg",
      employee_id: "EMP/111",
      id: "65ae5fc2bf709170e2585056",
      email: "ipankajkumarlpu@gmail.com",
    },
    id: "65bb34cad15ddf1f7a1b585b",
    associatedUser: {
      image: null,
    },
    createdAtText: "01-02-2024",
    updatedAtText: "29-05-2024",
    dueDateText: "22/02/2024 | 11:34 AM",
    dueDateListText: "22 February 2024  11:34 AM",
    completedOnText: "N/A",
    assignedOnText: "01 February 2024  11:36 AM",
    assignedOnDetailText: "01/02/2024  | 11:36 AM",
    associateUserName: "N/A",
  },
];

const TaskSection = ({
  filterValue,
  filterCompltedTask,
  // taskLists,
  handleDetailPage,
  markAsCompleted,
  completedHandler,
}) => {
  return (
    <ShadowBox width={"100%"}>
      <div>
        <div className={styles.upperFlex}>
          <h3 className={styles.taskHeading}>Tasks Lists</h3>
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
