import React, {useCallback, useState} from "react";
import styles from "./Styles.module.css";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./MyProfileHook";
import WaitingComponent from "../../components/Waiting.component";
import history from "../../libs/history.utils";
import {
    ArrowOutlineButton,
    ArrowPrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import {ButtonBase, Typography, useTheme} from "@mui/material";
import {Add, ArrowBackIos, Lock} from "@mui/icons-material";
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
        location,
    } = useMyProfileHook();

    const handleClose = () => {
        setOpen(!open);
    };
    const theme = useTheme();


    if (isLoading) {
        return (
            <div className={styles.bgProfile}><WaitingComponent/></div>);
    }

    return (
        <div className={styles.bgProfile}>
            <div>
                <div className={styles.upperFlex}>
                    <div className={styles.profileTitle}>
                        {location !== "/myprofile" && (
                            <ButtonBase onClick={() => history.push("/admin/users")}>
                                <ArrowBackIos fontSize={"medium"}/>{" "}
                            </ButtonBase>
                        )}
                        <Typography
                            variant="h3"
                            fontWeight={600}
                            color={theme.palette.text.primary}
                        >
                            Profile View
                        </Typography>
                    </div>
                    <div className={styles.profileHeaderAction}>
                        <ArrowOutlineButton
                            onClick={handleClose}
                            icon={<Lock fontSize="normal"/>}
                        >
                            <Typography variant={"body1"} fontWeight={600} color={""}>
                                RESET PASSWORD
                            </Typography>
                        </ArrowOutlineButton>
                        <ArrowPrimaryButton
                            icon={<Add fontSize={"small"}/>}
                            onClick={handleSideToggle}
                        >
                            <Typography variant={"body1"} fontWeight={600}>
                                ADD TASK
                            </Typography>
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
                    title={(<Typography variant="h3" fontWeight={600}
                                        sx={{marginTop: theme.spacing(4), marginBottom: theme.spacing(4)}}>
                      Add New Task
                    </Typography>)} // profileId ? "Update Hubs" :
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
        </div>
    );
};

export default Profile;
