import React, { memo } from "react";
import { Typography } from "@mui/material";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";
import { useTheme } from "@mui/styles";

const NoteItem = ({ note, styles }) => {
  const theme = useTheme();

  return (
    <div className={styles.notesView}>
  
        <Typography
          variant="body1"
          sx={{
           
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

            <Typography variant="h6" sx={{mt:theme.spacing(-0.5), color:theme?.palette.text?.secondary}}>{note?.createdAtText}</Typography>
          </div>
        </div>
    
      <div className={styles.gaps} />
    </div>
  );
};
export default memo(NoteItem);
