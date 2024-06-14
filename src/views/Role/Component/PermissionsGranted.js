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
                
                color={theme.palette.text.primary}
                
              >
                {permission?.name}:
              </Typography>
            </div>
            <div className={styles.permissionRow}>
              {permission?.all_data && (
                <Typography variant="body1"  color={theme.palette.text.secondary}>All Data,</Typography>
              )}
              {permission?.create && (
                <Typography variant="body1" color={theme.palette.text.secondary}>Create,</Typography>
              )}
              {permission?.read && (
                <Typography variant="body1" color={theme.palette.text.secondary}>Read,</Typography>
              )}
              {permission?.update && (
                <Typography variant="body1" color={theme.palette.text.secondary}>Update,</Typography>
              )}
              {permission?.delete && (
                <Typography variant="body1" color={theme.palette.text.secondary}>Delete</Typography>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PermissionsGranted);
