import React, { useState } from "react";
import styles from "./Styles.module.css";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./MyProfileHook";
import WaitingComponent from "../../components/Waiting.component";
import TaskListItem from "./TaskListView";
import history from "../../libs/history.utils";
import {
  ArrowOutlineButton,
  ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import { ButtonBase, FormControl, MenuItem, Select } from "@mui/material";
import { Add, ArrowBackIos, Lock } from "@mui/icons-material";
import ShadowBox from "../../components/ShadowBox/ShadowBox";

import ProfileSection from "./Componet/ProfileSection/ProfileSection";
import TaskSection from "./Componet/TaskSection/TaskSection";
const Profile = () => {
  const [open, setOpen] = useState(false);
  const {
    profileDetails,
    handleEdit,
    isLoading,
    handleSideToggle,
    handleDetailPage,
    taskLists,
    filterValue,
    markAsCompleted,
    completedHandler,
    filterCompltedTask,
  } = useMyProfileHook();

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      {isLoading ? (
        <WaitingComponent />
      ) : (
        <div>
          <div className={styles.upperFlex}>
            <ButtonBase onClick={() => history.push("/users")}>
              <ArrowBackIos fontSize={"small"} />{" "}
              <span>
                <b>My Profile</b>
              </span>
            </ButtonBase>
            <div></div>
            <div className={styles.profileHeading}></div>
            <div>
              <ArrowOutlineButton
                className={styles.resetButton}
                onClick={handleClose}
                icon={<Lock fontSize="normal" />}
              >
                <div className={styles.innerText}>Reset Password</div>
              </ArrowOutlineButton>
              <ArrowPrimaryButton
                icon={<Add fontSize={"small"} />}
                className={styles.addTask}
                onClick={handleSideToggle}
              >
                <div className={styles.innerText}>Add Task</div>
              </ArrowPrimaryButton>
            </div>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.profileFlex}>
              <ProfileSection
                profileDetails={profileDetails}
                handleEdit={handleEdit}
              />
              <TaskSection
                filterValue={filterValue}
                filterCompltedTask={filterCompltedTask}
                taskLists={taskLists}
                handleDetailPage={handleDetailPage}
                markAsCompleted={markAsCompleted}
                completedHandler={completedHandler}
              />
            </div>
          </div>
        
          <ResetPasswordDialog
            open={open}
            handleClose={handleClose}
            email={profileDetails?.email}
          />  
          
        </div>
      )}
    </div>
  );
};

export default Profile;
