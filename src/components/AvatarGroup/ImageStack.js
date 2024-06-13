import React from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import styles from "./Styles.module.css";
import { useTheme } from "@mui/styles";

const ImageStack = ({ industryData: imageArray, openProfilePopUp, open }) => {
  const theme = useTheme();
  return (
        <AvatarGroup
          max={4}
          spacing="small"
          variant="circular"
          sx={{
            marginLeft: theme.spacing(-3), 
          }}
          slotProps={{
            additionalAvatar: {
              onClick: openProfilePopUp,
              sx:{
                cursor: "pointer",
              }
            }
           }}
        >
          {imageArray?.map((industry, index) => (
              <Avatar  className={styles.avatarImageStack} key={industry?.id} sx={{
                '& .MuiTableCell-root':{
                  marginLeft:"-10px"
                }
              }}>
                <img src={industry?.image} alt={""} crossOrigin="anonymous" />
              </Avatar>
          ))}
        </AvatarGroup>
  
  );
};

export default ImageStack;
