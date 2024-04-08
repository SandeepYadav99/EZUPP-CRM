import React from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import styles from "./Styles.module.css";
const ImageStack = ({ industryData: imageArray }) => {
  return (
    <>
      {imageArray?.map((industry, index) => (
        <>
          <CardContent>
            <div className={styles.avaterAlignment}>
              <AvatarGroup max={3} className={styles.avatar_group}>
                <Avatar className={styles.avatar}>
                  <img src={industry?.image} alt={""} />
                </Avatar>

                <Tooltip title="+3 More" placement="bottom">
                  {imageArray.length > 2 && (
                    <Avatar className={styles.avatar}>
                      {imageArray.length}
                    </Avatar>
                  )}
                </Tooltip>
              </AvatarGroup>
            </div>
          </CardContent>
        </>
      ))}
    </>
  );
};

export default ImageStack;
