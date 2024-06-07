import { Avatar, CardHeader, Typography } from "@mui/material";
import React, { memo } from "react";
import StatusPill from "../../../../components/Status/StatusPill.component";
import {
  UserCountAvatarsLabel,
  UserCountAvatarsLabelInitials,
} from "../../../../components/AvatarGroup/AvatarGroup";

const AssignedContainer = ({ details, styles, classes }) => {
  return (
    <div className={styles.mainFlex}>
      <div className={styles.backgroundStatus}>
        <div className={styles.getfiledSpace}>
          <Typography
            variant="subtitle1"
           
            marginLeft={2}
          >
            Due Date:
          </Typography>{" "}
          <div>
            <CardHeader subheader={details?.dueDateText} />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <Typography
            variant="subtitle1"
            
            marginLeft={2}
          >
            Assigned To:
          </Typography>{" "}
          <div>
            <UserCountAvatarsLabel
              // title={"PI"}
              name={details?.assignedTo?.name}
              id={details?.assignedTo?.id}
              imgPath={details?.assignedTo?.image}
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <Typography
            variant="subtitle1"
           
            marginLeft={2}
          >
            Assigned By:
          </Typography>{" "}
          <div>
            <UserCountAvatarsLabel
              // title={"PI"}
              name={details?.assignedBy?.name}
              id={details?.assignedBy?.id}
              imgPath={details?.assignedBy?.image}
            />
          </div>
        </div>
        <div className={styles.getfiledSpace}>
          <Typography
            variant="subtitle1"
           
            marginLeft={2}
          >
            Task Category:
          </Typography>{" "}
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
                    <StatusPill status={cat} color={cat.toLowerCase()} />
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
