import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import { ButtonBase } from "@mui/material";
import { Add } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  customCalendar: {
    background: "yellow",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    background: "yellow",
  },
}));

function CalendarMui() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to handle date change
  const handleDateChange = (date) => {
    console.log(">>>>", date);
    setSelectedDate(date);
  };
  console.log("selectedDate", selectedDate);
  const classes = useStyles();
  return (
    <div className={styles.calWrapper}>
     
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        className={styles.calContainer}
      >
        <div className={classes.calendarContainer}>
          <DateCalendar
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            className="custom-date-calendar"
            value={selectedDate} // Pass the selectedDate to the DateCalendar
            onChange={handleDateChange} // Handle date change
            format={"dd-MM-yyyy"}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default CalendarMui;
