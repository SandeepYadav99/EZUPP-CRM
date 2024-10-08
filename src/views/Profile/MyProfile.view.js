import React, { useState } from "react";
import styles from "./Styles.module.css";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import { ButtonBase, FormControl, Select, MenuItem } from "@material-ui/core";
import {
  Add,
  CalendarToday,

  Group,
  Lock,
  Person,
  WatchLaterRounded,
} from "@material-ui/icons";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./MyProfileHook";
import WaitingComponent from "../../components/Waiting.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import AddTaskCreate from "./Create/AddTaskCreate";
import TaskListItem from "./TaskListView";
import capitalizeFirstLetter, { formatString } from "../../hooks/CommonFunction";
import AssociatedManufactures from "./AssociatedManufactures/AssociatedManufactures";
import historyUtils from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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
          <ButtonBase onClick={() => historyUtils.push("/admin/users")}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>My Profile</b>
            </span>
          </ButtonBase>
          <div>
       
        </div>
            <div className={styles.profileHeading}></div>
            <div>
              <ButtonBase className={styles.resetButton} onClick={handleClose}>
                <div>
                  <Lock fontSize={"small"} />
                </div>
                <div className={styles.innerText}>Reset Password</div>
              </ButtonBase>

              <ButtonBase className={styles.addTask} onClick={handleSideToggle}>
                <div>
                  <Add fontSize={"small"} />
                </div>
                <div className={styles.innerText}>Add Task</div>
              </ButtonBase>
            </div>
          </div>

          <div className={styles.profileFlex} >
            <div className={styles.leftSection}>
              <div className={styles.plain}>
                <ButtonBase
                  className={styles.edit}
                  onClick={() => handleEdit(profileDetails)}
                >
                  Edit
                </ButtonBase>
                <div className={styles.profileContainer}>
                  {profileDetails?.image &&   <img src={profileDetails?.image} alt="" className={styles.proImage}/>}
                

                  <div className={styles.name}>
                    {capitalizeFirstLetter(profileDetails?.name)}
                  </div>
                  <div className={styles.position}>
                    Emp. ID : {profileDetails?.employee_id || "N/A"}
                  </div>

                  <div className={styles.designation}>
                    {profileDetails?.role || "N/A"}
                  </div>
                  <div className={styles.status}>
                    {profileDetails?.status || "N/A"}
                  </div>
                </div>

                <hr />
                <h5 className={styles.heading}>Contact Info</h5>
                <div>
                  <div className={styles.contactFlex}>
                    <EmailIcon className={styles.contactIcons} />
                    <span className={styles.email}>
                      {" "}
                      {profileDetails?.email || "N/A"}
                    </span>
                  </div>
                  <div className={styles.contactFlex}>
                    <CallIcon className={styles.contactIcons} />{" "}
                    <span className={styles.email}>
                      {" "}
                      {profileDetails?.contact || "N/A"}
                    </span>
                  </div>
                </div>

                <h5 className={styles.heading}>Work Info</h5>
                <div>
                  <div className={styles.activityFlex}>
                    <Group className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {formatString(profileDetails?.department)}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <Person className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {formatString(profileDetails?.designation)}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <CalendarToday className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {formatString(
                        profileDetails?.joiningDateText || "N/A"
                      )}
                    </span>
                  </div>
                  <div className={styles.activityFlex}>
                    <Person className={styles.contactIcons} />

                    <span className={styles.activity}>Manager</span>
                  </div>
                </div>

                <h5 className={styles.heading}>Activity Info</h5>
                <div>
                  <div className={styles.activityFlex}>
                    <WatchLaterRounded className={styles.contactIcons} />

                    <span className={styles.activity}>
                      {profileDetails?.lastLoginText !== "Invalid date"
                        ? profileDetails?.lastLoginText
                        : "N/A"}
                    </span>
                  </div>
                
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
              <div>
                <div className={styles.plainPaper}>
                  <div className={styles.headingWrap}>
                    <div className={styles.newLineWrap}>
                      <span>
                        <b>Associated Manufacturers</b>
                      </span>
                      <div className={styles.newLine2} />
                    </div>
                  </div>
                  <AssociatedManufactures id={id ? id : userObject?.user?.id}/>

                  {/* listData={listData} */}
                </div>
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
