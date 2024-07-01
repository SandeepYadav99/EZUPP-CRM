import React, { memo } from "react";
import capitalizeFirstLetter, {
  firstLeterConverter,
 
} from "../../../../hooks/CommonFunction";
import StatusPill from "../../../../components/Status/StatusPill.component";
import { Typography } from "@mui/material";

const PillContainer = ({ details, styles }) => {
  const priority = firstLeterConverter(details?.priority);
  const type = firstLeterConverter(details?.type);

  return (
    <div>
      {" "}
      <div className={styles.statusPil}>
        <StatusPill
          status={details?.priority}
          color={details?.priority?.toLowerCase()}
        />
        <StatusPill status={details?.type} color={type} />
      </div>
      <div className={styles.des}>
        <Typography variant="subtitle1">Description: </Typography>
      </div>
      <Typography
        variant="subtitle2"
        sx={{
          width:"100%",
          wordBreak:"break-word",
          textOverflow:"hidden",

          "&::first-letter": {
            textTransform: "uppercase",
          },
        }}
      >
        {details?.description}
      </Typography>
      <div className={styles.gaps} />
    </div>
  );
};

export default memo(PillContainer);
