import { Avatar, CardHeader, Typography } from "@mui/material";
import React, { memo } from "react";
import RouteName from "../../../../routes/Route.name";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";

const TaskAssignedContainer = ({ styles, details, classes }) => {
  return (
    <div className={styles.mainFlex1}>
      {/* <div className={styles.gaps} /> */}
      <div
        className={styles.backgroundStatus1}
        //  style={{ width: details?.completedOnText === "N/A" ? "30%" : "50%" }}
      >
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={
                <Typography variant="subtitle1" >Task assigned on:</Typography>
              }
              subheader={details?.assignedOnDetailText}
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={
                <Typography variant="subtitle1">Task completed on:</Typography>
              }
              subheader={details?.completedOnText} // completedOnText
            />
          </div>
        </div>
      
      </div>
     <div className={styles.hrline}/>
      <div className={styles.backgroundStatus1}>
        
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={<Typography variant="subtitle1">Associated User</Typography>}
              subheader={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {capitalizeFirstLetter(
                    details?.associatedUser?.name || "N/A"
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.backgroundStatus1}>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}

          <CardHeader
            title={<Typography variant="subtitle1">Associated Task</Typography>}
            subheader={
              <div>
                {details?.associatedTask?.title ? (
                  <a
                    href={`${RouteName.TASK_DETAIL}${details?.associatedTask?._id}`}
                    style={{ fontSize: "13px" }}
                  >
                    {details?.associatedTask?.title}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(TaskAssignedContainer);
