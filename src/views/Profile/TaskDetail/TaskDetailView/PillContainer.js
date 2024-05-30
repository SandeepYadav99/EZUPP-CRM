import React, { memo } from "react";
import { formattedDescription } from "../../../../hooks/CommonFunction";
import StatusPill from "../../../../components/Status/StatusPill.component";
import { Typography } from "@mui/material";

const PillContainer = ({ details, styles }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#FF0000";
      case "MEDIUM":
        return "#FA8B55";
      case "LOW":
        return "#15F205";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <div>
      {" "}
      <div className={styles.pillContainer}>
        <div>
          <div>Task Priority</div>
          <div>
            <StatusPill
              status={details?.priority}
              color={details?.priority.toLowerCase()}
            />
          </div>
        </div>
        <div>
          <div>Task Type</div>
          <div className={styles.section}>{details?.type}</div>
        </div>
      </div>
      <div className={styles.des}>
        <Typography variant="subtitle1" color={"text.secondary"} >Description: </Typography>
      </div>
      <Typography variant="subtitle2" >{formattedDescription(details)}</Typography>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(PillContainer);
