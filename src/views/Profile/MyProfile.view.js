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
import {
  ButtonBase,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Add, ArrowBackIos, Lock } from "@mui/icons-material";
import ShadowBox from "../../components/ShadowBox/ShadowBox";

import ProfileSection from "./Componet/ProfileSection/ProfileSection";
import TaskSection from "./Componet/TaskSection/TaskSection";
import RouteName from "../../routes/Route.name";
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
    <div className={styles.bgProfile}>
      {isLoading ? (
        <WaitingComponent />
      ) : (
        <div>
          <div className={styles.upperFlex}>
            <ButtonBase onClick={() => history.push(RouteName.ADMIN_USER)}>
              <ArrowBackIos fontSize={"small"} />{" "}
              <span>
                <b>Profile View</b>
              </span>
            </ButtonBase>
            <div></div>
            <div className={styles.profileHeading}></div>
            <div className={styles.profileHeaderAction}>
              <ArrowOutlineButton
                className={styles.resetPassworedAction}
                onClick={handleClose}
                icon={<Lock fontSize="normal" />}
              >
                 <Typography variant={"subtitle1"}>RESET PASSWORD</Typography>
              
              </ArrowOutlineButton>
              <ArrowPrimaryButton
                icon={<Add fontSize={"small"} />}
                className={styles.resetPassworedAction}
                onClick={handleSideToggle}
              >
                
                <Typography variant={"subtitle1"}>ADD TASK</Typography>
              </ArrowPrimaryButton>
            </div>
          </div>
          <div>
            <div className={styles.profileFlex}>
              <div className={styles.leftSection}>
                <ProfileSection
                  profileDetails={profileDetails}
                  handleEdit={handleEdit}
                />
              </div>
              <div className={styles.rightSection}>
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
