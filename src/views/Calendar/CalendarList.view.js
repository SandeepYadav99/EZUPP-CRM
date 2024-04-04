import React from "react";
import CalendarMui from "./components/CalendarMui/CalendarMui";
import styles from "./Style.module.css";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CalendarDetail from "./components/FullCalendar/FullCalendar";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import useCalendarList from "./CalendarList.hook";
import EventForm from "./components/EventForm/EventForm.view";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";

function CalendarList() {
  const {
    isSidePanel,
    handleSideToggle,
    checkedItems,
    handleCheckboxChange,
    filteredData,
    selectedDate,
    handleDateChange,
  } = useCalendarList({});
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
    <PageBox classStyles={classes.pageBox}>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.calContainer}>
            <PrimaryButton onClick={handleSideToggle} style={{ width: "100%" }}>
              <Add fontSize={"small"} className={"plusIcon"}></Add>
              <Typography variant="body1">ADD EVENT</Typography>
            </PrimaryButton>
            <div className="calender_Wrapper">
              <CalendarMui
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>
          <div className={styles.lowerWrap}>
            <div className={styles.title}>FILTER</div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#636578", borderColor: "#636578" }}
                    name="all"
                    checked={checkedItems?.all}
                    onChange={handleCheckboxChange}
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
                    name="personal"
                    checked={checkedItems?.personal}
                    onChange={handleCheckboxChange}
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
                    name="business"
                    checked={checkedItems?.business}
                    onChange={handleCheckboxChange}
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
                    name="family"
                    checked={checkedItems?.family}
                    onChange={handleCheckboxChange}
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
                    name="holiday"
                    checked={checkedItems?.holiday}
                    onChange={handleCheckboxChange}
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
                    name="etc"
                    checked={checkedItems?.etc}
                    onChange={handleCheckboxChange}
                  />
                }
                className={classes.checkboxLabel}
                label="ETC"
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <CalendarDetail data={filteredData} selectedDate={selectedDate} />
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
  );
}

export default CalendarList;
