import React from "react";
import {
  Avatar,
  AvatarGroup,
  CardContent,
} from "@mui/material";
import styles from "./Styles.module.css";
import { useTheme } from "@mui/styles";


const ImageStack = ({ industryData: imageArray, openProfilePopUp, open }) => {
  const theme = useTheme();
  return (
    <CardContent >
      <div className={styles.avaterAlignment}>
        <AvatarGroup
          max={3}
          sx={{
            marginLeft: theme.spacing(-3),
          }}
        >
          {imageArray?.map((industry, index) => (
            <div key={industry?.id}>
              <Avatar className={styles.avatar} onClick={openProfilePopUp}>
                <img src={industry?.image} alt={""} crossOrigin="anonymous" />
              </Avatar>
            </div>
          ))}
        </AvatarGroup>
      </div>
    
    </CardContent>
  );
};

export default ImageStack;
