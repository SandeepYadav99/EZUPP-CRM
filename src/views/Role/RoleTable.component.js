
import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  
} from "@mui/material";
import { useTheme } from "@mui/styles";
import styles from "./Style.module.css";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import {  InfoOutlined } from "@mui/icons-material";
import WraperComponentCheckBox from "./Component/WraperComponent";

const RoleTableComponent = ({
  permissions,
  permisionChangeHandler,
  allData,
  setAllData,
  setPermissions,

}) => {
  const handleCheckboxChange = useCallback(
    (event, permissionType, index) => {
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

  const handleRead= useCallback(
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
  const handleWrite= useCallback(
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
  const handleUpdate= useCallback(
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
  const handleDeletePermision= useCallback(
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
       overflow:"scroll",
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(1),
        },
      }}
    >
      <div className={styles.infoFiled}>
        <Typography  variant="h3" fontWeight={600} color={theme.palette.text.primary} sx={{
          marginTop:theme.spacing(4.5),
          marginLeft:theme.spacing(2),
          marginBottom:theme.spacing(4)
        }}>
          Permissions Granted
        </Typography>
        <InfoOutlined fontSize="16px" />
      </div>
      <Table sx={{width:"100%", margin:"auto", marginBottom:theme.spacing(4)}}>
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
          <WraperComponentCheckBox module={true}>
            <Checkbox
              sx={{
                marginLeft: theme.spacing(-1),
              }}
              checked={
                
                permissions.every((permission) => permission.all_data)
              }
              onChange={handleAllDataChange}
            />{" "}
            All Data
          </WraperComponentCheckBox>
          <WraperComponentCheckBox module={true}>
            <Checkbox
              sx={{
                marginLeft: theme.spacing(-1),
              }}
              checked={ permissions.every((permission) => permission.read)}
              onChange={handleRead}
            />{" "}
            Read
          </WraperComponentCheckBox>
          <WraperComponentCheckBox module={true}>
            <Checkbox
              sx={{
                marginLeft: theme.spacing(-1),
              }}
              onChange={handleWrite}
              checked={permissions.every((permission) => permission.create)}
            />{" "}
            Write
          </WraperComponentCheckBox>
          <WraperComponentCheckBox module={true}>
            <Checkbox
              sx={{
                marginLeft: theme.spacing(-1),
              }}
              onChange={handleUpdate}
              checked={ permissions.every((permission) => permission.update)}
            />{" "}
            Update
          </WraperComponentCheckBox>
          <WraperComponentCheckBox module={true}>
            <Checkbox
              sx={{
                marginLeft: theme.spacing(-1),
              }}
              onChange={handleDeletePermision}
              checked={ permissions.every((permission) => permission.delete)}
            />{" "}
            Delete
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
                        marginLeft:theme.spacing(0.5),
                       
                      }}
                      color={theme.palette.text.secondary}
                    >
                      {permission?.name}{" "}
                    </Typography>
                    <InfoOutlined fontSize="16px" color={"action"} />
                  </div>
                </TableCell>
                <WraperComponentCheckBox
                  permission={permission?.all_data}
                  index={index}
                >
                  <Checkbox
                    sx={{
                      marginLeft: theme.spacing(-1),
                    }}
                    size="medium"
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
                  All Data
                </WraperComponentCheckBox>

                <WraperComponentCheckBox
                  permission={permission?.read}
                  index={index}
                >
                  <Checkbox
                    sx={{
                      marginLeft: theme.spacing(-1),
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
                  Read
                </WraperComponentCheckBox>
                <WraperComponentCheckBox
                  permission={permission?.create}
                  index={index}
                >
                  <Checkbox
                    sx={{
                      marginLeft: theme.spacing(-1),
                    }}
                    checked={
                      allData &&
                      permissions.every((permission) => permission.create)
                        ? allData
                        : permission?.create
                    }
                    
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.create, `create`, index)
                    }
                  />
                  Write
                </WraperComponentCheckBox>
                <WraperComponentCheckBox
                  permission={permission?.update}
                  index={index}
                >
                  <Checkbox
                    sx={{
                      marginLeft: theme.spacing(-1),
                    }}
                    checked={
                      allData &&
                      permissions.every((permission) => permission.update)
                        ? allData
                        : permission?.update
                    }
                  
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.update, `update`, index)
                    }
                  />
                  Update
                </WraperComponentCheckBox>
                <WraperComponentCheckBox
                  permission={permission?.delete}
                  index={index}
                >
                  <Checkbox
                    sx={{
                      marginLeft: theme.spacing(-1),
                    }}
                    checked={
                      allData &&
                      permissions.every((permission) => permission.delete)
                        ? allData
                        : permission?.delete
                    }
                   
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.delete, `delete`, index)
                    }
                  />
                  Delete
                </WraperComponentCheckBox>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ShadowBox>
  );
};

export default RoleTableComponent;
