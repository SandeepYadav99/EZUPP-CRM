import { Avatar, CardHeader, Typography } from '@mui/material';
import React, { memo } from "react";
import RouteName from "../../../../routes/Route.name";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";

const TaskAssignedContainer = ({ styles, details, classes }) => {

  return (
    <div className={styles.mainFlex}>
      {/* <div className={styles.gaps} /> */}
      <div className={styles.backgroundStatus1} style={{ width: details?.completedOnText === 'N/A' ? '44%' : '50%' }}>
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
          <div >
            <CardHeader
              title={
                <Typography variant="subtitle1" >Task completed on:</Typography>
              }
              subheader={details?.completedOnText} // completedOnText
            />
          </div>
        </div>
      </div>
      <div className={styles.backgroundStatus1}>
        <div className={styles.getfiledSpace}>
          {/* Avator  */}
          <div>
            <CardHeader
              title={<span >Associated User</span>}
              subheader={
                <div style={{ display: "flex", alignItems: "center" }}>
                    {details?.associatedUser?.name ?
                    <>
                  <Avatar
                    className={classes.avatar}
                    src={details?.associatedUser?.image}
                  >
                    {details?.associatedUser?.name
                      ? details?.associatedUser?.name[0].toUpperCase()
                      : "N/A"}
                  </Avatar>
                 <a
                    href={ `/profile/?id=${details?.associatedUser?.id}`

                    }
                  >
                    {capitalizeFirstLetter(details?.associatedUser?.name)
                     }
                  </a>
                    </> : "N/A"}

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
            title={<span>Associated Task</span>}
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
