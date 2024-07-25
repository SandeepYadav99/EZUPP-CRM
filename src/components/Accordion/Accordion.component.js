/**
 * Created by charnjeetelectrovese@gmail.com on 5/27/2020.
 */
import React, { Component } from "react";
import { IconButton, Paper } from "@mui/material";
import { useTheme, withStyles } from "@mui/styles";
import styles from "./Style.module.css";
import classNames from "classnames";
import {
  Edit,
  KeyboardArrowRight as DownIcon,
  KeyboardArrowUp as UpIcon,
} from "@mui/icons-material";

const Collapse = (props) => {
  const theme = useTheme();
  console.log(theme)
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleExpand = () => {
    setExpand(!expand);
  };

  const handleLowerView = () => {
    const { onEditClick, quesIndex, newValue, children, title } = props;

    if (newValue) {
      return (
        <div>
          <div
            onClick={handleExpand}
            className={classNames(
              styles.innerPanel,
              open ? styles.panelOpen : styles.panelClose
            )}
          >
            <span className={styles.titleBlue}>{newValue}</span>
            <span className={styles.iconContainerBelow}>
              {!expand ? <DownIcon /> : <UpIcon />}
            </span>
          </div>
          <div
            className={classNames(
              styles.panelCollapse,
              expand ? styles.panelOpen : styles.panelClose
            )}
          >
            {children}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={classNames(styles.panelGroup)}
          // style={{
          //   backgroundColor: theme.palette.tableHeadColor,
          //   color: theme.palette.text.primary,
          // }}
        >
          <div className={classNames(styles.panelHeader)}  style={{
            backgroundColor:  theme.palette.tableHeadColor,
            color: theme.palette.text.primary,
          }}>
            <span className={styles.title}>{title}</span>
            <div className={classNames(styles.editFlex, "editAccordion")}>
              <span className={styles.iconContainer} onClick={handleClick}>
                {!open ? <DownIcon /> : <UpIcon />}
              </span>
              <IconButton
                onClick={() => {
                  onEditClick && onEditClick(quesIndex);
                }}
              >
                <Edit color={"primary"} fontSize={"small"} />
              </IconButton>
            </div>
          </div>
          <div
            className={classNames(open ? styles.panelOpen : styles.panelClose)}
            style={{
              color: theme.palette.text.primary,
              backgroundColor:
                theme.palette.mode === "dark" ? theme.palette.text.primary : "#fff",
            }}
          >
            <div
              className={classNames(
                styles.panelCollapse,
                expand ? styles.panelOpen : styles.panelClose
              )}
            >
              {children}
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{handleLowerView()}</div>;
};

export default Collapse;
