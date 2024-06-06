import React from "react";
import {
  Avatar,
  AvatarGroup,
 
  CardContent,
 
} from "@mui/material";
import styles from "./Styles.module.css";
import { useTheme } from "@mui/styles";
import ImageStackPopUp from "../../views/Role/List/ImageStackPopUp/ImageStackPopUp";

const ImageStack = ({ industryData: imageArray, openProfilePopUp, open }) => {
  const theme = useTheme();
  return (
    <CardContent>
      <div className={styles.avaterAlignment}>
        <AvatarGroup
          max={3}
          sx={{
            marginLeft: theme.spacing(-10),
          }}
        >
          {imageArray?.map((industry, index) => (
            <>
              <Avatar className={styles.avatar} onClick={openProfilePopUp}>
                <img src={industry?.image} alt={""} crossOrigin="anonymous" />
              </Avatar>
            </>
          ))}
        </AvatarGroup>
      </div>
    
    </CardContent>
  );
};

export default ImageStack;
