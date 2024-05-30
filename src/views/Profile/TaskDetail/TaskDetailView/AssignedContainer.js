import { Avatar, CardHeader, Typography } from '@mui/material';
import React, { memo } from "react";
import StatusPill from "../../../../components/Status/StatusPill.component";

const AssignedContainer = ({ details, styles, classes }) => {
  return (
    <div className={styles.mainFlex}>
      <div className={styles.backgroundStatus}>
        <div className={styles.getfiledSpace}>
          <Typography variant="subtitle1" color={"text.secondary"}  marginLeft={2}>Due Date:</Typography>{" "}

          <div>
            <CardHeader subheader={details?.dueDateText} />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <Typography variant="subtitle1" color={"text.secondary"} marginLeft={2}>Assigned To:</Typography>{" "}

          <div>
            <CardHeader
              avatar={
                <Avatar
                  alt="User Avatar"
                  src={details?.assignedTo?.image}
                  style={{ width: "40px", height: "40px" }}
                ></Avatar>
              }
              title={
                <a
                  className={classes.boldTitle}
                  href={`${"/profile/"}?id=${details?.assignedTo?.id}`}
                >
                  {details?.assignedTo?.name}
                </a>
              }
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <Typography variant="subtitle1" color={"text.secondary"} marginLeft={2}>Assigned By:</Typography>{" "}

          <div>
            <CardHeader
              avatar={<Avatar src={details?.assignedBy?.image}></Avatar>}
              title={
                <a
                  className={classes.boldTitle}
                  href={`${"/profile/"}?id=${details?.assignedBy?.id}`}
                >
                  {details?.assignedBy?.name}
                </a>
              }
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <Typography variant="subtitle1" color={"text.secondary"}  marginLeft={2}>Task Category:</Typography>{" "}

          <CardHeader
            subheader={
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                {details?.category?.map((cat, index) => (
                  <span key={index}>
                    <StatusPill
                      status={cat}
                      color={cat.toLowerCase()}
                    />
                    {index < details.category.length - 1 && " , "}
                  </span>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(AssignedContainer);
