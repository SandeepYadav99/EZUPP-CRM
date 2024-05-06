import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getBgColor, getTextColor } from "../../../../helper/Helper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { OutlineButton } from "../../../../components/Buttons/PrimaryButton";
import { ButtonBase, ButtonGroup, Typography } from "@mui/material";
import styles from "./Style.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const localizer = momentLocalizer(moment);

const CalendarDetail = ({ data ,selectedDate}) => {
  const [events, setEvents] = useState([...data]);

  useEffect(() => {
    setEvents(data);
  }, [data]);

  const [activeMonth, setActiveMonth] = useState("month");
  console.log("data", data);
  const handleEventAdd = (event) => {
    // setEvents([...events, event]);
  };

  const handleEventRemove = (eventToRemove) => {
    // setEvents(events.filter((event) => event !== eventToRemove));
  };
  console.log("events", activeMonth);

  const eventStyleGetter = (event) => {
    let backgroundColor = getBgColor(event?.type); // Default color
    let textColor = getTextColor(event?.type);
    return {
      style: {
        backgroundColor: backgroundColor,
        color: textColor,
      },
    };
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    // console.log("onView",onView)
    return (
      <div className={styles.toolWrapper}>
        <div className={styles.upperWrap}>
          <ButtonBase onClick={() => onNavigate("PREV")}>
            <ArrowBackIosIcon fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
          <ButtonBase onClick={() => onNavigate("NEXT")}>
            <ArrowForwardIosIcon
              fontSize={"small"}
              className={styles.backIcon}
            />
          </ButtonBase>
          <Typography variant="h5">{label}</Typography>
        </div>
        <div>
          <ButtonGroup
            variant="outlined"
            size="large"
            aria-label="Medium-sized button group"
          >
            <OutlineButton color="primary" onClick={() => onView("month")}>
              <Typography variant="body1">MONTH</Typography>
            </OutlineButton>
            <OutlineButton color="primary" onClick={() => onView("week")}>
              <Typography variant="body1">WEEK</Typography>
            </OutlineButton>
            <OutlineButton color="primary" onClick={() => onView("day")}>
              <Typography variant="body1">DAY</Typography>
            </OutlineButton>
            <OutlineButton color="primary" onClick={() => onView("agenda")}>
              <Typography variant="body1">LIST</Typography>
            </OutlineButton>
          </ButtonGroup>
        </div>
      </div>
    );
  };
  const handleSlotSelect = (slotInfo) => {
    console.log(slotInfo)
    // setActiveDate(slotInfo.start); // Update state with selected date
  };
  return (
    <div className={styles.detailWrap}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventRemove}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        popup
        style={{ padding: "10px" }}
        components={{
          toolbar: CustomToolbar, // Replace default toolbar with custom toolbar
        }}
        onView={(view) => setActiveMonth(view)}
        // date={selectedDate?.$d && selectedDate?.$d}
      />
    </div>
  );
};

export default CalendarDetail;
