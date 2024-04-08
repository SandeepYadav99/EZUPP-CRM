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
  PrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import {
  ButtonBase,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { Add, ArrowBackIos,  Lock } from "@mui/icons-material";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import capitalizeFirstLetter, {
  formatString,
} from "../../hooks/CommonFunction";

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
            <div className={styles.container}>
              <ShadowBox width={"98%"}>
                <div className={styles.status}>
                  {profileDetails?.status || "N/A"}
                </div>

                 <div className={styles.profileContainer}>
                  <div>
                    {profileDetails?.image && (
                      <img
                        src={profileDetails?.image}
                        alt=""
                        className={styles.proImage}
                      />
                    )}
                  </div>
                  <div>
                    <div className={styles.name}>
                      {capitalizeFirstLetter(profileDetails?.name)}
                    </div>
                    <div className={styles.position}>
                      Emp. ID : {profileDetails?.employee_id || "N/A"}
                    </div>
                    <div className={styles.saveButton}>
                      <PrimaryButton onClick={() => handleEdit(profileDetails)}>
                        Edit
                      </PrimaryButton>
                    </div>
                  </div>
                </div> 
              </ShadowBox>
            </div>

             <div className={styles.profileFlex}>
              <div className={styles.leftSection}>
                <>
                  <ShadowBox>
                    <div className={styles.heading}>Personal Details</div>

                    <div>
                      <div className={styles.contactFlex}>
                        <div className={styles.sideTitle}>Username:</div>
                        <span className={styles.email}>
                          {" "}
                          {profileDetails?.user_name || "N/A"}
                        </span>
                      </div>
                      <div className={styles.contactFlex}>
                        <div className={styles.sideTitle}>Email</div>
                        <span className={styles.email}>
                          {" "}
                          {profileDetails?.email || "N/A"}
                        </span>
                      </div>
                      <div className={styles.contactFlex}>
                        <div className={styles.sideTitle}>Contact</div>
                        <span className={styles.email}>
                          {" "}
                          {profileDetails?.contact || "N/A"}
                        </span>
                      </div>
                      <div className={styles.contactFlex}>
                        <div className={styles.sideTitle}>Role</div>
                        <span className={styles.email}>
                          {" "}
                          {profileDetails?.role?.name || "N/A"}
                        </span>
                      </div>
                    </div>

                    <hr />
                    <div className={styles.heading}>Work Details</div>
                    <div>
                      <div className={styles.activityFlex}>
                        <div className={styles.sideTitle}>Work Details</div>

                        <span className={styles.activity}>
                          {formatString(profileDetails?.department)}
                        </span>
                      </div>
                      <div className={styles.activityFlex}>
                        <div className={styles.sideTitle}>Designation:</div>

                        <span className={styles.activity}>
                          {formatString(profileDetails?.designation)}
                        </span>
                      </div>
                      <div className={styles.activityFlex}>
                        <div className={styles.sideTitle}>Manager:</div>

                        <span className={styles.activity}>
                          {formatString(profileDetails?.manager?.name || "N/A")}
                        </span>
                      </div>
                      <div className={styles.activityFlex}>
                        <div className={styles.sideTitle}>Joining Date:</div>

                        <span className={styles.activity}>
                          {profileDetails?.joiningDateText}
                        </span>
                      </div>

                      <div className={styles.activityFlex}>
                        <div className={styles.sideTitle}>
                          User is a Manager:
                        </div>

                        <span className={styles.activity}>
                          {profileDetails?.is_manager ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    <hr />
                    <div className={styles.heading}>Activity Info</div>

                    <div className={styles.activityFlex}>
                      <div className={styles.sideTitle}>Created On:</div>

                      <span className={styles.activity}>
                        {profileDetails?.createdAtText}
                      </span>
                    </div>
                    <div className={styles.activityFlex}>
                      <div className={styles.sideTitle}>Updated On:</div>

                      <span className={styles.activity}>
                        {profileDetails?.updatedAtText}
                      </span>
                    </div>
                    <div className={styles.activityFlex}>
                      <div className={styles.sideTitle}>Updated By:</div>
 
                     <span className={styles.activity}>
                        { "N/A"}
                      </span> 
                    </div>
                    <div className={styles.activityFlex}>
                      <div className={styles.sideTitle}>Last Login:</div>

                      <span className={styles.activity}>
                        {profileDetails?.lastLoginText}
                      </span>
                    </div>
                  </ShadowBox>
                </>
              </div>

              <div className={styles.rightSection}>
                <ShadowBox width={"40rem"}>
                  <div className={styles.plain}>
                    <div className={styles.upperFlex}>
                      <h3 className={styles.taskHeading}>Tasks Lists</h3>
                      <div className={"myprofile"}>
                        <FormControl
                          variant={"outlined"}
                          className={styles.selectWidth}
                        >
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
                      <p className={styles.notfound}>
                        {" "}
                        Tasks is not available!
                      </p>
                    )}
                  </div>
                </ShadowBox>
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
