import React from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import styles from "./Styles.module.css";
import { useTheme } from "@mui/styles";

const ImageStack = ({ industryData: imageArray, openProfilePopUp, open }) => {
  const theme = useTheme();

  return (
    <AvatarGroup
      max={4}
      spacing="11"
      variant="circular"
      sx={{
        marginLeft: theme.spacing(-0.3),
        '& .MuiAvatarGroup-avatar': {
         border:`1px solid  ${theme.palette.border}`,
       }
      }}
      slotProps={{
        additionalAvatar: {
          onClick: openProfilePopUp,
          sx: {
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 700,
          },
        },
      }}
    >
      {imageArray?.map((industry, index) => (
        <Avatar className={styles.avatarImageStack} key={industry?.id}>
          <img src={industry?.image}   alt={""} crossOrigin="anonymous" />
        </Avatar>
      ))}
    </AvatarGroup>
  );
};

export default ImageStack;
