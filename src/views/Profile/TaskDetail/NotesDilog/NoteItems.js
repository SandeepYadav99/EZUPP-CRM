import React, { memo } from "react";
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";
import { useTheme } from "@mui/styles";

const NoteItem = ({ note, styles, classes }) => {
  const theme = useTheme();
  return (
    <div className={styles.notesView}>
  
        <Typography
          variant="body1"
          sx={{
            // marginLeft: theme.spacing(2),
            wordBreak: "break-word",
            marginTop: "8px",
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {note?.title}
        </Typography>
        <div className={styles.userInfo}>
          <img
            height={36}
            width={36}
            src={note?.userData?.image}
            alt=""
            crossOrigin="anonymous"
          />
          <div className={styles.subUserInfo}>
            <Typography variant="subtitle1" fontWeight={600}>
              {capitalizeFirstLetter(note?.userData?.name)}
            </Typography>

            <Typography variant="subtitle2" sx={{mt:theme.spacing(-0.5)}}>{note?.createdAtText}</Typography>
          </div>
        </div>
    
      <div className={styles.gaps} />
    </div>
  );
};
export default memo(NoteItem);
