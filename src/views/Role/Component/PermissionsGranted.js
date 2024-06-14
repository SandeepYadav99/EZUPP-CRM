import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const PermissionsGranted = ({ state, styles }) => {
  const theme = useTheme();
  return (
    <div>
      {state?.permissions?.map((permission) => {
        console.log(permission);
        return (
          <div className={styles.rightContaiiner}>
            <div>
              <Typography
                variant="subtitle1"
                margin={theme.spacing(1.5)}
                fontWeight={600}
              >
                {permission?.name}:
              </Typography>
            </div>
            <div className={styles.permissionRow}>
              {permission?.all_data && (
                <Typography variant="body1">All Data,</Typography>
              )}
              {permission?.create && (
                <Typography variant="body1">Create,</Typography>
              )}
              {permission?.read && (
                <Typography variant="body1">Read,</Typography>
              )}
              {permission?.update && (
                <Typography variant="body1">Update,</Typography>
              )}
              {permission?.delete && (
                <Typography variant="body1">Delete</Typography>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PermissionsGranted);
