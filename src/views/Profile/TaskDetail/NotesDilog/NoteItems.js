import React, { memo } from "react";
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import capitalizeFirstLetter from "../../../../hooks/CommonFunction";
import { useTheme } from "@mui/styles";

const NoteItem = ({ note, styles, classes }) => {
  const theme = useTheme();
  return (
    <div>
      <Card
        sx={{
          margin: theme.spacing(1),
          boxShadow:"none", 
          borderBottom:"1px solid #E4E4E6"
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginLeft: theme.spacing(2),
            wordBreak: "break-word",
            marginTop: "8px",
            "&::first-letter":{
              textTransform:"uppercase"
            }
          }}
        >
          {note?.title}
        </Typography>
        <CardHeader
          avatar={<Avatar src={note?.userData?.image} />}
          title={
            <span className={classes.boldTitle}>
              {capitalizeFirstLetter(note?.userData?.name)}
            </span>
          }
          subheader={<span>{note?.createdAtText}</span>}
        />
      </Card>
      <div className={styles.gaps} />
    </div>
  );
};
export default memo(NoteItem);
