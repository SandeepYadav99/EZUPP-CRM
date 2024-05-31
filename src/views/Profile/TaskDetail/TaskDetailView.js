import {
  ButtonBase,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import { makeStyles } from "@mui/styles";
import { Edit } from "@mui/icons-material";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceTaskMnagmentUpdateStatus } from "../../../services/TaskManage.service";
import TaskDetailHeader from "./TaskDetailView/TaskDetailHeader";
import PillContainer from "./TaskDetailView/PillContainer";
import AssignedContainer from "./TaskDetailView/AssignedContainer";
import TaskAssignedContainer from "./TaskDetailView/TaskAssignedContainer";
import AddNoteContainer from "./NotesDilog/AddNoteContainer";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import AddTaskUpdate from "./Update/UpdateDetail";

import WaitingComponent from "../../../components/Waiting.component";
import { serviceTaskManagementDetail } from "../../../services/ProviderUser.service";
import { useParams } from "react-router-dom";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import {
  ArrowOutlineButton,
  OutlineButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

const useStyles = makeStyles((theme) => ({
  boldTitle: {
    fontWeight: "bold",
  },
  subTitle: {
    fontWeight: "normal",
    fontSize: "13px",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
  subHeadeer: {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  paragraph: {
    fontSize: "13px",
    color: "#000",
  },
}));

const jsontoJs = {
  _id: "65ba32d7fb1f30fe28028455",
  category: ["CHECK", "Category"],
  is_overdue: true,
  is_completed: true,
  status: "ACTIVE",
  title: "Assign the task for FG",
  description: "STEPS TO REGENERATE\n1. Check\n2. Priority",
  due_date: "2024-01-23T16:30:00.000Z",
  type: "DISCUSS",
  priority: "HIGH",
  comment: "Task",
  createdAt: "2024-01-31T11:45:27.730Z",
  updatedAt: "2024-05-29T22:00:00.382Z",
  completed_on: "2024-05-29T18:12:58.754Z",
  assignedTo: {
    name: "Rajat singh",
    email: "31pankajkumar@gmail.com",
    image: "http://91.205.173.97:2444/public/user_images/default_user.jpg",
    employee_id: "EMP/212",
    id: "65b9fa8496aeebef1df24b88",
  },
  assignedBy: {
    name: "Pankaj kumar",
    image: "http://91.205.173.97:2444/public/business/1706092503596_Astral.jpg",
    employee_id: "EMP/111",
    id: "65ae5fc2bf709170e2585056",
    email: "ipankajkumarlpu@gmail.com",
  },
  id: "65ba32d7fb1f30fe28028455",
  associatedUser: {
    image: null,
  },
  createdAtText: "31-01-2024",
  updatedAtText: "30-05-2024",
  dueDateText: "23/01/2024 | 10:00 PM",
  dueDateListText: "23 January 2024  10:00 PM",
  completedOnText: "29/05/2024 | 11:42 PM",
  assignedOnText: "31 January 2024  05:15 PM",
  assignedOnDetailText: "31/01/2024  | 05:15 PM",
  associateUserName: "N/A",
};

const TaskDetailView = ({}) => {
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const id = queryParams.get("id");
  const classes = useStyles();
  const [isSidePanel, setSidePanel] = useState(false);
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  // const { present: details } = useSelector((state) => state.common);
  const [filterValue, setFilterValue] = useState("ALL");
  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp]
  );

  const filterCompltedTask = useCallback(
    (event) => {
      setFilterValue(event);
    },
    [filterValue]
  );
  const fetchTaskDetails = useCallback(() => {
    // setTimeout(() => {
    serviceTaskManagementDetail({ id: id }).then((res) => {
      if (!res?.error) {
        setDetails(res?.data);
      } else {
        SnackbarUtils.error(res?.message);
      }
    });
    // }, 2000);
  }, [id]);

  const markAsCompleted = useCallback(async () => {
    try {
      await serviceTaskMnagmentUpdateStatus({
        is_completed: true,
        id: id ? id : "",
      });
      // setTimeout(() => {
      fetchTaskDetails();
      SnackbarUtils.success("Task is marked as completed");
      // }, 3000);
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  }, [id, fetchTaskDetails]);

  const completedHandler = useCallback(async () => {
    try {
      await serviceTaskMnagmentUpdateStatus({
        is_completed: false,
        id: id ? id : "",
      });
      // setTimeout(() => {
      fetchTaskDetails();
      SnackbarUtils.success("Task is marked as incomplete");
      // }, 4000);
    } catch (error) {
      console.error("Error marking task as incomplete:", error);
    }
  }, [id, fetchTaskDetails]);

  useEffect(() => {
    fetchTaskDetails();
  }, [id, isSidePanel]);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel] // , profileId, id,  userObject?.user?.id
  );
  // if (!details && !isSidePanel) {
  //   return <WaitingComponent />;
  // }
  return (
    <div>
      <div className={styles.outerFlex}>
        <div className={styles.arrowBack}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant="h5">Task Detail</Typography>
        </div>

        <div className={styles.editAction}>
          <CustomSelectField
            value={filterValue}
            handleChange={filterCompltedTask}
            className={styles.selectWidth}
          >
            <MenuItem value={"PENDING"}>Pending</MenuItem>
            <MenuItem value={"COMPLETED"}>Completed</MenuItem>
            <MenuItem value={"ALL"}>All</MenuItem>
          </CustomSelectField>

          <ArrowOutlineButton
            onClick={handleSideToggle}
            icon={<Edit fontSize={"20px"} />}
            className={styles.actionOutline}
            paddingLR={3}
            paddingTB={0}
            borderRadius={8}
           
           
          >
            <Typography variant="subtitle1">EDIT</Typography>
            {/* */}
          </ArrowOutlineButton>
        </div>
      </div>
      <ShadowBox width={"100%"}>
        <div>
          <div className={styles.newContainer}>
            <TaskDetailHeader
              details={jsontoJs} // details
              markAsCompleted={markAsCompleted}
              styles={styles}
              completedHandler={completedHandler}
            />
            <PillContainer details={jsontoJs} styles={styles} />
            {/* details */}
            <AssignedContainer
              styles={styles}
              details={jsontoJs}
              classes={classes}
            />
            <TaskAssignedContainer
              classes={classes}
              styles={styles}
              details={jsontoJs}
            />
          </div>
        </div>
      </ShadowBox>

      <div className={styles.newNotes}>
        <ShadowBox width={"100%"}>
          <AddNoteContainer
            details={jsontoJs}
            styles={styles}
            classes={classes}
            toggleAcceptDialog={toggleAcceptDialog}
            isAcceptPopUp={isAcceptPopUp}
          />
        </ShadowBox>
      </div>

      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={" Update Task"}
        open={isSidePanel}
        side={"right"}
      >
        <AddTaskUpdate
          handleSideToggle={handleSideToggle}
          isSidePanel={isSidePanel}
          empId={id}
          details={jsontoJs}
        />
      </SidePanelComponent>
    </div>
  );
};

export default TaskDetailView;
