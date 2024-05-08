/**
 * Created by charnjeetelectrovese@gmail.com on 4/27/2020.
 */
import React, { Component, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./Style.module.css";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import { Info, InfoOutlined } from "@mui/icons-material";

const RoleTableComponent = ({
  classes,
  permissions,
  permisionChangeHandler,
}) => {
  const handleCheckboxChange = useCallback(
    (event, permissionType, index) => {
      permisionChangeHandler(index, { [permissionType]: event });
    },
    [permisionChangeHandler, permissions]
  );

  return (
    <ShadowBox width={"100%"}>
      <div className={styles.infoFiled}>
        <Typography  className={styles.headerTitle}>Permissions Granted </Typography>
        <InfoOutlined fontSize="16px" color="#888888"/>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {permissions?.map((permission, index) => {
            return (
              <TableRow key={index}>
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={styles.infoFiled}>
                    <Typography className={styles.subTitle}>{permission?.name} </Typography>
                    <InfoOutlined fontSize="16px" color="#888888"/>
                  </div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={permission?.all_data ? styles.crudHover : styles.crud}>
                    <Checkbox
                      color={"primary"}
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
                  </div>
                </TableCell>
                
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={permission?.read ? styles.crudHover : styles.crud}>
                    <Checkbox
                      color={"primary"}
                      checked={permission?.read}
                      onChange={(event) =>
                        handleCheckboxChange(!permission?.read, `read`, index)
                      }
                    />
                    Read
                  </div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={permission?.create ? styles.crudHover : styles.crud}>
                    <Checkbox
                      color={"primary"}
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
                  </div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={permission?.update ? styles.crudHover : styles.crud}>
                    <Checkbox
                      color={"primary"}
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
                  </div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={permission?.delete ? styles.crudHover : styles.crud}>
                    <Checkbox
                      color={"primary"}
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
                  </div>
                </TableCell>
                <hr />
              </TableRow>
            );
          })}
          {/* <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                    </TableRow> */}
        </TableBody>
      </Table>
    </ShadowBox>
  );
};

const useStyle = (theme) => ({
  tableCell: {
    color: "black",
    fontSize: "0.90rem",
    textTransform: "capitalize",
  },
  cardHeader: {
    padding: "10px",
  },
  singleCell: {
    textAlign: "center",
  },
});

export default withStyles(useStyle, { withTheme: true })(RoleTableComponent);
