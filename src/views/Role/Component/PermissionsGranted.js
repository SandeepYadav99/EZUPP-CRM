import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const PermissionsGranted = ({ state, styles }) => {
  const theme = useTheme();
  return (
    <div>
      {state?.permissions?.map((permission) => {
     
        return (
          <div className={styles.rightContaiiner}>
            <div>
              <Typography
                variant="h5"
                margin={theme.spacing(1.5)}
                fontWeight={600}
                fontSize={14}
                color={theme.palette.text.subText1}
                
              >
                {permission?.name}:
              </Typography>
            </div>
            <div className={styles.permissionRow}>
              {permission?.all_data && (
                <Typography variant="body1"  color={theme.palette.text.subText}>All Data,</Typography>
              )}
              {permission?.create && (
                <Typography variant="body1" color={theme.palette.text.subText}>Create,</Typography>
              )}
              {permission?.read && (
                <Typography variant="body1" color={theme.palette.text.subText}>Read,</Typography>
              )}
              {permission?.update && (
                <Typography variant="body1" color={theme.palette.text.subText}>Update,</Typography>
              )}
              {permission?.delete && (
                <Typography variant="body1" color={theme.palette.text.subText}>Delete</Typography>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PermissionsGranted);
