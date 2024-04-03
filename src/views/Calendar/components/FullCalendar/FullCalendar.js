import React, { useState } from "react";
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

const CalendarDetail = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      type: "personal",
      title: "Meeting",
      start: new Date(2024, 3, 5, 10, 0), // Year, Month (0 indexed), Day, Hour, Minute
      end: new Date(2024, 3, 5, 12, 0),
    },
    {
      id: 2,
      type: "business",
      title: "Presentation",
      start: new Date(2024, 3, 10, 13, 0),
      end: new Date(2024, 3, 10, 15, 0),
    },
    {
      id: 3,
      type: "family",
      title: "Conference",
      start: new Date(2024, 3, 15, 9, 0),
      end: new Date(2024, 3, 15, 17, 0),
    },
    {
      id: 4,
      type: "business",
      title: "Different",
      start: new Date(2024, 3, 16, 9, 0),
      end: new Date(2024, 3, 16, 17, 0),
    },
    {
      id: 4,
      type: "holiday",
      title: "Different",
      start: new Date(2024, 3, 16, 9, 0),
      end: new Date(2024, 3, 16, 17, 0),
    },
    {
      id: 4,
      type: "holiday",
      title: "Different",
      start: new Date(2024, 3, 16, 9, 0),
      end: new Date(2024, 3, 16, 17, 0),
    },
    {
      id: 4,
      type: "family",
      title: "Different",
      start: new Date(2024, 3, 16, 9, 0),
      end: new Date(2024, 3, 16, 17, 0),
    },
    {
      id: 5,
      type: "etc",
      title: "Different",
      start: new Date(2024, 3, 18, 9, 0),
      end: new Date(2024, 3, 19, 17, 0),
    },
    {
      id: 6,
      type: "etc",
      title: "Different",
      start: new Date(2024, 3, 17, 9, 0),
      end: new Date(2024, 3, 17, 17, 0),
    },
  ]);
  const [activeMonth, setActiveMonth] = useState("month");
  // Function to handle event addition
  const handleEventAdd = (event) => {
    setEvents([...events, event]);
  };

  // Function to handle event removal
  const handleEventRemove = (eventToRemove) => {
    setEvents(events.filter((event) => event !== eventToRemove));
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
          <Typography variant="h4">{label}</Typography>
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
  return (
    <div className={styles.detailWrap}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleEventAdd}
        onSelectEvent={handleEventRemove}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        popup
        style={{ padding: "10px" }}
        components={{
          toolbar: CustomToolbar, // Replace default toolbar with custom toolbar
        }}
        onView={(view) => setActiveMonth(view)}
      />
    </div>
  );
};

export default CalendarDetail;
