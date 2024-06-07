/**
 * Created by charnjeetelectrovese@gmail.com on 4/27/2020.
 */
import React, {  useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  Card,
 
} from "@mui/material";
import { useTheme, withStyles } from "@mui/styles";
import styles from "./Style.module.css";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import { Info, InfoOutlined } from "@mui/icons-material";
import WraperComponentCheckBox from "./Component/WraperComponent";

const RoleTableComponent = ({
  
  permissions,
  permisionChangeHandler,
}) => {
  const handleCheckboxChange = useCallback(
    (event, permissionType, index) => {
      permisionChangeHandler(index, { [permissionType]: event });
    },
    [permisionChangeHandler, permissions]
  );
  const theme = useTheme();

  return (
    <ShadowBox
      className={styles.mainContainer}
      sx={{
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(1),
        },
      }}
    >
      <div className={styles.infoFiled}>
        <Typography fontSize={18} fontWeight={600}>
          Permissions Granted
        </Typography>
        <InfoOutlined fontSize="16px" />
      </div>
      <Table  aria-label="simple table">
        <TableBody>
          {permissions?.map((permission, index) => {
            return (
              <TableRow key={index}>
                <TableCell >
                  <div className={styles.infoFiled}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={theme.palette.text.primary}
                    >
                      {permission?.name}{" "}
                    </Typography>
                    <InfoOutlined fontSize="16px" color={"action"} />
                  </div>
                </TableCell>
                <TableCell >
                  <Card
                    sx={{
                      textAlign: "center",
                      width: "70%",
                      border: permission?.all_data
                      ? `1px solid ${theme.palette.primary.ractange}`
                      : `1px solid ${theme.palette.primary.ractangeborder}`,
                      "& .MuiPaper-root-MuiCard-root": {
                        backgroundColor: theme.palette.text.primary,
                      },
                    }}
                  >
                    <Checkbox
                      sx={{}}
                      checked={permission?.all_data}
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.all_data,
                          `all_data`,
                          index
                        )
                      }
                    />{" "}
                    All Data
                  </Card>
                </TableCell>

                <TableCell >
                  <Card
                    sx={{
                      textAlign: "center",
                      width: "70%",
                      border: permission?.read
                        ? `1px solid ${theme.palette.primary.ractange}`
                        : `1px solid ${theme.palette.primary.ractangeborder}`,
                      "& .MuiPaper-root-MuiCard-root": {
                        backgroundColor: theme.palette.text.primary,
                      },
                    }}
                  >
                    <Checkbox
                      checked={permission?.read}
                      onChange={(event) =>
                        handleCheckboxChange(!permission?.read, `read`, index)
                      }
                    />
                    Read
                  </Card>
                </TableCell>
                <TableCell >
                  <Card
                    sx={{
                      textAlign: "center",
                      width: "70%",
                      border: permission?.create
                      ? `1px solid ${theme.palette.primary.ractange}`
                      : `1px solid ${theme.palette.primary.ractangeborder}`,
                      "& .MuiPaper-root-MuiCard-root": {
                        backgroundColor: theme.palette.text.primary,
                      },
                    }}
                  >
                    <Checkbox
                      checked={permission?.create}
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.create,
                          `create`,
                          index
                        )
                      }
                    />
                    Write
                  </Card>
                </TableCell>
                <TableCell >
                  <Card
                    sx={{
                      textAlign: "center",
                      width: "70%",
                      border: permission?.update
                      ? `1px solid ${theme.palette.primary.ractange}`
                      : `1px solid ${theme.palette.primary.ractangeborder}`,
                      "& .MuiPaper-root-MuiCard-root": {
                        backgroundColor: theme.palette.text.primary,
                      },
                    }}
                  >
                    <Checkbox
                      checked={permission?.update}
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.update,
                          `update`,
                          index
                        )
                      }
                    />
                    Update
                  </Card>
                </TableCell>
                <TableCell >
                  <Card
                    sx={{
                      textAlign: "center",
                      width: "70%",
                      border: permission?.delete
                      ? `1px solid ${theme.palette.primary.ractange}`
                      : `1px solid ${theme.palette.primary.ractangeborder}`,
                      "& .MuiPaper-root-MuiCard-root": {
                        backgroundColor: theme.palette.text.primary,
                      },
                    }}
                  >
                    <Checkbox
                      checked={permission?.delete}
                      onChange={(event) =>
                        handleCheckboxChange(
                          !permission?.delete,
                          `delete`,
                          index
                        )
                      }
                    />
                    Delete
                  </Card>
                </TableCell>
                <hr />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ShadowBox>
  );
};


export default RoleTableComponent;
