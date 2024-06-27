import { ButtonBase, MenuItem, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import { makeStyles, useTheme } from "@mui/styles";
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

import { serviceTaskManagementDetail } from "../../../services/ProviderUser.service";
import { useParams } from "react-router-dom";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import { ArrowOutlineButton } from "../../../components/Buttons/PrimaryButton";
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

const TaskDetailView = ({}) => {
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const classes = useStyles();
  const [isSidePanel, setSidePanel] = useState(false);
  const { id } = useParams();
  const theme = useTheme();
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
    serviceTaskManagementDetail({ id: id }).then((res) => {
      if (!res?.error) {
        setDetails(res?.data);
      } else {
        SnackbarUtils.error(res?.message);
      }
    });
  }, [id]);

  const markAsCompleted = useCallback(async () => {
    try {
      await serviceTaskMnagmentUpdateStatus({
        is_completed: true,
        id: id ? id : "",
      });

      fetchTaskDetails();
      SnackbarUtils.success("Task is marked as completed");
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

  return (
    <div>
      <div className={styles.outerFlex}>
        <div className={styles.arrowBack}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant="h4" fontSize={18} color={theme.palette.text.primary}>
            Task Detail
          </Typography>
        </div>

        <div className={styles.editAction}>
          <CustomSelectField
            value={filterValue}
            handleChange={filterCompltedTask}
          >
            <MenuItem value={"PENDING"}>Pending</MenuItem>
            <MenuItem value={"COMPLETED"}>Completed</MenuItem>
            <MenuItem value={"ALL"}>All</MenuItem>
          </CustomSelectField>

          <ArrowOutlineButton
            onClick={handleSideToggle}
            icon={<Edit fontSize="small" />}
          >
            <Typography variant="subtitle1">EDIT</Typography>
          </ArrowOutlineButton>
        </div>
      </div>
      <ShadowBox width={"100%"}>
        <div>
          <div className={styles.newContainer}>
            <TaskDetailHeader
              details={details} // details
              markAsCompleted={markAsCompleted}
              styles={styles}
              completedHandler={completedHandler}
            />
            <PillContainer details={details} styles={styles} />
            {/* details */}
            <AssignedContainer
              styles={styles}
              details={details}
              classes={classes}
            />
            <TaskAssignedContainer
              classes={classes}
              styles={styles}
              details={details}
            />
          </div>
        </div>
      </ShadowBox>

      <div className={styles.newNotes}>
        <ShadowBox width={"100%"}>
          <AddNoteContainer
            details={details}
            styles={styles}
            classes={classes}
            toggleAcceptDialog={toggleAcceptDialog}
            isAcceptPopUp={isAcceptPopUp}
          />
        </ShadowBox>
      </div>

      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={
          <Typography variant="h5" fontSize={18} fontWeight={600}>
            Update Task
          </Typography>
        }
        open={isSidePanel}
        side={"right"}
      >
        <AddTaskUpdate
          handleSideToggle={handleSideToggle}
          isSidePanel={isSidePanel}
          empId={id}
          details={details}
        />
      </SidePanelComponent>
    </div>
  );
};

export default TaskDetailView;
