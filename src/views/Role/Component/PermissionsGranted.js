import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const PermissionsGranted = ({ state, styles }) => {
  const theme = useTheme();
  return (
    <div>
      {state?.permissions?.map((permission) => {
        const permissionsArray = [];
        if (permission?.all_data) permissionsArray.push("All Data");
        if (permission?.create) permissionsArray.push("Create");
        if (permission?.read) permissionsArray.push("Read");
        if (permission?.update) permissionsArray.push("Update");
        if (permission?.delete) permissionsArray.push("Delete");

        return (
          <div className={styles.rightContaiiner}>
            <div>
              <Typography
                variant="subtitle1"
                mt={theme.spacing(0.8)}
                mb={theme.spacing(0.8)}
                fontWeight={600}
                color={theme.palette.text.primary}
              >
                {permission?.name}:
              </Typography>
            </div>
            <div className={styles.permissionRow}>
              <Typography variant="body1" color={theme.palette.text.secondary}>
                {permissionsArray.join(", ")}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PermissionsGranted);
