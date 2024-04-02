import React from "react";
import CalendarMui from "./components/CalendarMui/CalendarMui";
import styles from "./Style.module.css";
import { ButtonBase, Checkbox, FormControlLabel } from "@mui/material";
import { Add, CheckBox } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CalendarDetail from "./components/FullCalendar/FullCalendar";

function CalendarList() {
  const useStyles = makeStyles((theme) => ({
    checkboxLabel: {
      color: "#636578",
      fontWeight: "bold",
      fontSize: "18px",
    },
  }));
  const classes = useStyles();
  return (
    <div className={styles.plainPaper}>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div>
            <ButtonBase
              // onClick={handleCreate}
              className={"AddBtn"}
            >
              <Add fontSize={"small"} className={"plusIcon"}></Add>
              Add Event
            </ButtonBase>
            <CalendarMui />
          </div>
          <div>
            <div className={styles.title}>FILTER</div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#636578", borderColor: "#636578" }}
                    //  checked={checked}
                    //   onChange={handleChange}
                  />
                }
                className={classes.checkboxLabel}
                label="View All"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#ff4d49" }}
                    //  checked={checked}
                    //   onChange={handleChange}
                  />
                }
                className={classes.checkboxLabel}
                label="Personal"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#666cff" }}
                    //  checked={checked}
                    //   onChange={handleChange}
                  />
                }
                className={classes.checkboxLabel}
                label="Business"
              />
            </div>{" "}
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#fdb528" }}
                    //  checked={checked}
                    //   onChange={handleChange}
                  />
                }
                className={classes.checkboxLabel}
                label="Family"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#72e128" }}
                    //  checked={checked}
                    //   onChange={handleChange}
                  />
                }
                className={classes.checkboxLabel}
                label="Holiday"
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#26c6f9" }}
                    //  checked={checked}
                    //   onChange={handleChange}
                  />
                }
                className={classes.checkboxLabel}
                label="ETC"
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <CalendarDetail/>
        </div>
      </div>
    </div>
  );
}

export default CalendarList;
