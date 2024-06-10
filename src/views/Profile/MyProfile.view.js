import React, { useState } from "react";
import styles from "./Styles.module.css";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./MyProfileHook";
import WaitingComponent from "../../components/Waiting.component";
import history from "../../libs/history.utils";
import {
  ArrowOutlineButton,
  ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import {
  ButtonBase,
  Typography,
  useTheme,
} from "@mui/material";
import { Add, ArrowBackIos, Lock } from "@mui/icons-material";
import ProfileSection from "./Componet/ProfileSection/ProfileSection";
import TaskSection from "./Componet/TaskSection/TaskSection";
import AddTaskCreate from "./Create/AddTaskCreate";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";

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
    isSidePanel,
    handleCreatedTask,
    location
  } = useMyProfileHook();

  const handleClose = () => {
    setOpen(!open);
  };
  const theme = useTheme();
   
  return (
    <div className={styles.bgProfile}>
      {isLoading ? (
        <WaitingComponent />
      ) : (
        <div>
          <div className={styles.upperFlex}>
          <div className={styles.profileTitle}>
            {location !== "/profile" && 
            <ButtonBase onClick={() => history.push("/")}>
              <ArrowBackIos fontSize={"medium"} />{" "}
            </ButtonBase>}
            <Typography fontSize={24} fontWeight={600} color={theme.palette.text.primary}>Profile View</Typography>
            </div>
            <div className={styles.profileHeaderAction}>
              <ArrowOutlineButton
                onClick={handleClose}
                paddingLR={2}
                paddingTB={1}
                borderRadius={8}
                icon={<Lock fontSize="normal" />}
              >
                 <Typography variant={"subtitle1"} color={""}>RESET PASSWORD</Typography>
              </ArrowOutlineButton>
              <ArrowPrimaryButton
                icon={<Add fontSize={"small"} />}
                paddingLR={2}
                paddingTB={1}
                borderRadius={8}
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
            <SidePanelComponent
            handleToggle={handleSideToggle}
            title={"Add New Task"} // profileId ? "Update Hubs" :
            open={isSidePanel}
            side={"right"}
          >
            <AddTaskCreate
              handleSideToggle={handleSideToggle}
              isSidePanel={isSidePanel}
              // empId={profileId}
              profileDetails={profileDetails}
              handleCreatedTask={handleCreatedTask}
            />
          </SidePanelComponent> 
        </div>
      )}
    </div>
  );
};

export default Profile;
