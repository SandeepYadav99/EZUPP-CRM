import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import styles from "./Style.module.css";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import { InfoOutlined } from "@mui/icons-material";
import WraperComponentCheckBox from "./Component/WraperComponent";
import { HeaderTitleComponet } from "../../components/CustomListHeader/CustomListHeader";

const RoleTableComponent = ({
  permissions,
  permisionChangeHandler,
  allData,
  setAllData,
  setPermissions,
}) => {
  const handleCheckboxChange = useCallback((event, permissionType, index) => {
      permisionChangeHandler(index, { [permissionType]: event });
    },
    [permisionChangeHandler, permissions]
  );

  const handleAllDataChange = useCallback(
    (event) => {
      const checked = event.target.checked;
      setAllData(checked);
      const updatedPermissions = permissions.map((permission) => ({
        ...permission,
        all_data: checked,
      }));

      setPermissions(updatedPermissions);
    },
    [permissions, setAllData, permisionChangeHandler]
  );

  const handleRead = useCallback(
    (event) => {
      const checked = event.target.checked;
      setAllData(checked);
      const updatedPermissions = permissions.map((permission) => ({
        ...permission,
        read: checked,
      }));

      setPermissions(updatedPermissions);
    },
    [permissions, setAllData, permisionChangeHandler]
  );
  const handleWrite = useCallback(
    (event) => {
      const checked = event.target.checked;
      setAllData(checked);
      const updatedPermissions = permissions.map((permission) => ({
        ...permission,
        create: checked,
      }));

      setPermissions(updatedPermissions);
    },
    [permissions, setAllData, permisionChangeHandler]
  );
  const handleUpdate = useCallback(
    (event) => {
      const checked = event.target.checked;
      setAllData(checked);
      const updatedPermissions = permissions.map((permission) => ({
        ...permission,
        update: checked,
      }));

      setPermissions(updatedPermissions);
    },
    [permissions, setAllData, permisionChangeHandler]
  );
  const handleDeletePermision = useCallback(
    (event) => {
      const checked = event.target.checked;
      setAllData(checked);
      const updatedPermissions = permissions.map((permission) => ({
        ...permission,
        delete: checked,
      }));

      setPermissions(updatedPermissions);
    },
    [permissions, setAllData, permisionChangeHandler]
  );
  const theme = useTheme();

  return (
    <ShadowBox
      className={styles.mainContainer}
      sx={{
        overflow: "auto",

        padding: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(1),
        },
      }}
    >
      <div className={styles.subContainer}>
        <div className={styles.infoFiled}>
          {/* <Typography
            variant="h4"
            fontWeight={600}
            color={theme.palette.text.primary}
            sx={{
              marginLeft: theme.spacing(1.2),
            }}
          >
            Permissions Granted
          </Typography> */}
          <HeaderTitleComponet headerTitle={"Permissions Granted"}/>
          <Tooltip title={"Info"} placement="top">
            <InfoOutlined fontSize="16px" />
          </Tooltip>
        </div>
        <Table
          sx={{ width: "100%", margin: "auto", marginBottom: theme.spacing(4) }}
        >
          <TableBody>
            <TableCell
              sx={{
                [theme.breakpoints.down("sm")]: {
                  display: "block",
                  width: "100%",
                  marginBottom: theme.spacing(1),
                },
              }}
            >
              <div className={styles.infoFiled1}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={theme.palette.text.primary}
                >
                  Modules
                </Typography>
              </div>
            </TableCell>
            <WraperComponentCheckBox
              module={true}
              permissionHeader={permissions.every(
                (permission) => permission.all_data
              )}
            >
              <Checkbox
                sx={{
                  marginLeft: theme.spacing(-1),
                  width: "18px",
                  height: "18px",
                }}
                checked={permissions.every((permission) => permission.all_data)}
                onChange={handleAllDataChange}
              />{" "}
              <span className={styles.checkboxlabel}>All Data</span>

            </WraperComponentCheckBox>
            <WraperComponentCheckBox
              module={true}
              permissionHeader={permissions.every(
                (permission) => permission.read
              )}
            >
              <Checkbox
                sx={{
                  marginLeft: theme.spacing(-1),
                  width: "18px",
                  height: "18px",
                }}
                checked={permissions.every((permission) => permission.read)}
                onChange={handleRead}
              />{" "}
              <span className={styles.checkboxlabel}>Read</span>

            </WraperComponentCheckBox>
            <WraperComponentCheckBox
              module={true}
              permissionHeader={permissions.every(
                (permission) => permission.create
              )}
            >
              <Checkbox
                sx={{
                  marginLeft: theme.spacing(-1),
                  width: "18px",
                  height: "18px",
                }}
                onChange={handleWrite}
                checked={permissions.every((permission) => permission.create)}
              />{" "}
              <span className={styles.checkboxlabel}>Write</span>

            </WraperComponentCheckBox>
            <WraperComponentCheckBox
              module={true}
              permissionHeader={permissions.every(
                (permission) => permission.update
              )}
            >
              <Checkbox
                sx={{
                  marginLeft: theme.spacing(-1),
                  width: "18px",
                  height: "18px",
                }}
                onChange={handleUpdate}
                checked={permissions.every((permission) => permission.update)}
              />{" "}
              <span className={styles.checkboxlabel}>Update</span>

            </WraperComponentCheckBox>
            <WraperComponentCheckBox
              module={true}
              permissionHeader={permissions.every(
                (permission) => permission.delete
              )}
            >
              <Checkbox
                sx={{
                  marginLeft: theme.spacing(-1),
                  width: "18px",
                  height: "18px",
                }}
                onChange={handleDeletePermision}
                checked={permissions.every((permission) => permission.delete)}
              />{" "}
              <span className={styles.checkboxlabel}>Delete</span>

            </WraperComponentCheckBox>

            {permissions?.map((permission, index) => {
              return (
                <TableRow key={index} sx={{ borderBottom: "none" }}>
                  <TableCell
                    sx={{
                      borderBottom: "none",

                      [theme.breakpoints.down("sm")]: {
                        display: "block",
                        width: "100%",
                      },
                    }}
                  >
                    <div className={styles.infoFiled1}>
                      <Typography
                        variant="h6"
                        sx={{
                          marginLeft: theme.spacing(0.5),
                        }}
                        color={theme.palette.text.secondary}
                      >
                        {permission?.name}{" "}
                      </Typography>
                      <Tooltip title={"Info"} placement="top">
                        <InfoOutlined fontSize="16px" />
                      </Tooltip>
                    </div>
                  </TableCell>
                  <WraperComponentCheckBox
                    permission={permission?.all_data}
                    index={index}
                  >
                    <Checkbox
                      sx={{
                        marginLeft: theme.spacing(-1),
                        width: "18px",
                        height: "18px",
                      }}
                      checked={
                        allData &&
                        permissions.every((permission) => permission.all_data)
                          ? allData
                          : permission?.all_data
                      }
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.all_data,
                          `all_data`,
                          index
                        )
                      }

                    />{" "}
                    <span className={styles.checkboxlabel}> All Data</span>

                  </WraperComponentCheckBox>

                  <WraperComponentCheckBox
                    permission={permission?.read}
                    index={index}
                  >
                    <Checkbox
                      sx={{
                        marginLeft: theme.spacing(-1),
                        width: "18px",
                        height: "18px",
                      }}
                      checked={
                        allData &&
                        permissions.every((permission) => permission.read)
                          ? allData
                          : permission?.read
                      }
                      onChange={(event) =>
                        handleCheckboxChange(!permission?.read, `read`, index)
                      }
                    />
                    <span className={styles.checkboxlabel}>Read</span>

                  </WraperComponentCheckBox>
                  <WraperComponentCheckBox
                    permission={permission?.create}
                    index={index}
                  >
                    <Checkbox
                      sx={{
                        marginLeft: theme.spacing(-1),
                        width: "18px",
                        height: "18px",
                      }}
                      checked={
                        allData &&
                        permissions.every((permission) => permission.create)
                          ? allData
                          : permission?.create
                      }
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.create,
                          `create`,
                          index
                        )
                      }
                    />
                    <span className={styles.checkboxlabel}>Write</span>

                  </WraperComponentCheckBox>
                  <WraperComponentCheckBox
                    permission={permission?.update}
                    index={index}
                  >
                    <Checkbox
                      sx={{
                        marginLeft: theme.spacing(-1),
                        width: "18px",
                        height: "18px",
                      }}
                      checked={
                        allData &&
                        permissions.every((permission) => permission.update)
                          ? allData
                          : permission?.update
                      }
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.update,
                          `update`,
                          index
                        )
                      }
                    />
                    <span className={styles.checkboxlabel}>Update</span>

                  </WraperComponentCheckBox>
                  <WraperComponentCheckBox
                    permission={permission?.delete}
                    index={index}
                  >
                    <Checkbox
                      sx={{
                        marginLeft: theme.spacing(-1),
                        width: "18px",
                        height: "18px",
                      }}
                      checked={
                        allData &&
                        permissions.every((permission) => permission.delete)
                          ? allData
                          : permission?.delete
                      }
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.delete,
                          `delete`,
                          index
                        )
                      }
                    />
                    <span className={styles.checkboxlabel}>Delete</span>

                  </WraperComponentCheckBox>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </ShadowBox>
  );
};

export default RoleTableComponent;
