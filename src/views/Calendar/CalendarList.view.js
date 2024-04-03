import React from "react";
import CalendarMui from "./components/CalendarMui/CalendarMui";
import styles from "./Style.module.css";
import { ButtonBase, Checkbox, FormControlLabel } from "@mui/material";
import { Add, CheckBox } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CalendarDetail from "./components/FullCalendar/FullCalendar";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import useCalendarList from "./CalendarList.hook";
import EventForm from "./components/EventForm/EventForm.view";

function CalendarList() {
  const { isSidePanel, handleSideToggle } = useCalendarList({});
  const useStyles = makeStyles((theme) => ({
    checkboxLabel: {
      color: "#636578",
      fontWeight: "bold",
      fontSize: "18px",
      fontWeight: "500",
    },
  }));
  const classes = useStyles();
  return (
    // <div className={styles.plainPaper}>
    <PageBox classStyles={classes.pageBox}>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.calContainer}>
            <ButtonBase onClick={handleSideToggle} className={"AddBtn"}>
              <Add fontSize={"small"} className={"plusIcon"}></Add>
              Add Event
            </ButtonBase>
            <CalendarMui />
          </div>
          <div className={styles.lowerWrap}>
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
          <CalendarDetail />
        </div>
      </div>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"Add Event"}
        open={isSidePanel}
        side={"right"}
      >
        <EventForm isOpen={isSidePanel} handleToggle={handleSideToggle} />
      </SidePanelComponent>
    </PageBox>

    // </div>
  );
}

export default CalendarList;
