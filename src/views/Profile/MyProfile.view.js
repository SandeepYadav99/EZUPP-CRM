import React, { useState } from "react";
import styles from "./Styles.module.css";


import {
  Add,
  CalendarToday,
  Group,
  Lock,
  Person,
  WatchLaterRounded,
} from "@mui/icons-material";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./MyProfileHook";
import WaitingComponent from "../../components/Waiting.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import AddTaskCreate from "./Create/AddTaskCreate";
import TaskListItem from "./TaskListView";
import capitalizeFirstLetter, {
  formatString,
} from "../../hooks/CommonFunction";

import historyUtils from "../../libs/history.utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, ButtonBase, FormControl, Select } from "@mui/material";
import { MenuItem } from "@mui/base";
const Profile = () => {
  const [open, setOpen] = useState(false);
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const {
    profileDetails,
    handleEdit,
    isLoading,
    isSidePanel,
    handleSideToggle,
    id,
    handleDetailPage,
    taskLists,
    filterValue,
    handleCreatedTask,
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
            <ButtonBase onClick={() => historyUtils.push("/users")}>
              <ArrowBackIosIcon fontSize={"small"} />{" "}
              <span>
                <b>My Profile</b>
              </span>
            </ButtonBase>
            <div></div>
            <div className={styles.profileHeading}></div>
            <div>
              <ButtonBase className={styles.resetButton} onClick={handleClose}>
                <div className={styles.innerText}>Reset Password</div>
                <div>
                  <Lock fontSize={"small"} />
                </div>
              </ButtonBase>

              <ButtonBase className={styles.addTask} onClick={handleSideToggle}>
                <div className={styles.innerText}>Add Task</div>
                <div>
                  <Add fontSize={"small"} />
                </div>
              </ButtonBase>
            </div>
          </div>

          <div className={styles.profileFlex}>
            <div className={styles.leftSection}>
              <div className={styles.plain}>
                {/* <ButtonBase
                  className={styles.edit}
                  onClick={() => handleEdit(profileDetails)}
                >
                  Edit
                </ButtonBase> */}
                <div className={styles.profileContainer}>
                  {profileDetails?.image && (
                    <img
                      src={profileDetails?.image}
                      alt=""
                      className={styles.proImage}
                    />
                  )}

                  <div className={styles.name}>
                    {capitalizeFirstLetter(profileDetails?.name)}
                  </div>
                  <div className={styles.position}>
                    Emp. ID : {profileDetails?.employee_id || "N/A"}
                  </div>

                  <div className={styles.status}>
                    {profileDetails?.status || "N/A"}
                  </div>
                  <div className={styles.saveButton}>
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      type="button"
                      // onClick={handleSaveClick}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

               
                <div className={styles.heading}>Personal Details</div>
                <hr/>
                <div>
                  <div className={styles.contactFlex}>
                    <div className={styles.sideTitle}>Username:</div>
                    <span className={styles.email}>
                      {" "}
                      {profileDetails?.email || "N/A"}
                    </span>
                  </div>
                  <div className={styles.contactFlex}>
                    <div className={styles.sideTitle}>Email</div>
                    <span className={styles.email}>
                      {" "}
                      {profileDetails?.contact || "N/A"}
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
                      {profileDetails?.contact || "N/A"}
                    </span>
                  </div>
                </div>

                <div className={styles.heading}>Work Details</div>
                <hr/>
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
                      {formatString(profileDetails?.joiningDateText || "N/A")}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <div className={styles.sideTitle}>Joining Date:</div>

                    <span className={styles.activity}>Manager</span>
                  </div>
                 
                  <div className={styles.activityFlex}>
                    <div className={styles.sideTitle}>User is a Manager:</div>

                    <span className={styles.activity}>Manager</span>
                  </div>
                </div>

                <div className={styles.heading}>Activity Info</div>
                <hr/>
               
                <div className={styles.activityFlex}>
                    <div className={styles.sideTitle}>Created On:</div>

                    <span className={styles.activity}>Manager</span>
                  </div>
                  <div className={styles.activityFlex}>
                    <div className={styles.sideTitle}>Updated On:</div>

                    <span className={styles.activity}>Manager</span>
                  </div>
                  <div className={styles.activityFlex}>
                    <div className={styles.sideTitle}>Updated By:</div>

                    <span className={styles.activity}>Manager</span>
                  </div>
                  <div className={styles.activityFlex}>
                    <div className={styles.sideTitle}>Last Login:</div>

                    <span className={styles.activity}>Manager</span>
                  </div>
              </div>
            </div>
            <div className={styles.rightSection}>
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
                {taskLists && taskLists.length > 0 ? (
                  taskLists.map((task) => (
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
         
            </div>
          </div>

          <ResetPasswordDialog
            open={open}
            handleClose={handleClose}
            email={profileDetails?.email}
          />
          {/* Side Pannel for Add Task management  */}
          <SidePanelComponent
            handleToggle={handleSideToggle}
            title={"Create New Task"} // profileId ? "Update Hubs" :
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
