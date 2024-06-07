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
 
} from "@mui/material";
import { useTheme, withStyles } from "@mui/styles";
import styles from "./Style.module.css";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import { Info, InfoOutlined } from "@mui/icons-material";
import WraperComponentCheckBox from "./Component/WraperComponent";

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
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {permissions?.map((permission, index) => {
            return (
              <TableRow
                key={index}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    marginBottom: theme.spacing(2),
                  },
                }}
              >
                <TableCell classes={{ root: classes.tableCell }}>
                  <div className={styles.infoFiled1}>
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
                <WraperComponentCheckBox
                  permission={permission?.all_data}
                  classes={classes}
                  index={index}
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
                </WraperComponentCheckBox>

                <WraperComponentCheckBox
                  permission={permission?.read}
                  classes={classes}
                >
                  <Checkbox
                    checked={permission?.read}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.read, `read`, index)
                    }
                  />
                  Read
                </WraperComponentCheckBox>
                <WraperComponentCheckBox
                  permission={permission?.create}
                  classes={classes}
                >
                  <Checkbox
                    checked={permission?.create}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.create, `create`, index)
                    }
                  />
                  Write
                </WraperComponentCheckBox>
                <WraperComponentCheckBox
                  permission={permission?.update}
                  classes={classes}
                >
                  <Checkbox
                    checked={permission?.update}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.update, `update`, index)
                    }
                  />
                  Update
                </WraperComponentCheckBox>
                <WraperComponentCheckBox
                  permission={permission?.delete}
                  classes={classes}
                >
                  <Checkbox
                    checked={permission?.delete}
                    onChange={(event) =>
                      handleCheckboxChange(!permission?.delete, `delete`, index)
                    }
                  />
                  Delete
                </WraperComponentCheckBox>
                <hr />
              </TableRow>
            );
          })}
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
