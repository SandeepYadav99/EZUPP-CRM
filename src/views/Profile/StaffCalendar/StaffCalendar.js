import React, { useEffect, useState } from "react";
import { getBgColor, getTextColor } from "../../../helper/Helper";
import { ButtonBase, ButtonGroup, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { OutlineButton } from "../../../components/Buttons/PrimaryButton";
import styles from "./Style.module.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import { useTheme } from "@mui/styles";
const localizer = momentLocalizer(moment);

const StaffCalendar = ({ data, selectedDate }) => {
    const theme = useTheme()
  const [events, setEvents] = useState([...data]);
  const [active, setActive] = useState("week");
  useEffect(() => {
    setEvents(data);
  }, [data]);

  const handleEventRemove = (eventToRemove) => {
    // setEvents(events.filter((event) => event !== eventToRemove));
  };

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
  const activeClass = {
    background: "#ECF7FF 0% 0% no-repeat padding-box",
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    // console.log("onView",onView)
    return (
      <div className={styles.toolWrapper}>
        <div className={styles.upperWrap}>
          <ButtonBase onClick={() => onNavigate("PREV")}>
            <ArrowBackIos fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
          <ButtonBase onClick={() => onNavigate("NEXT")}>
            <ArrowForwardIos fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
          <Typography variant="h5">{label}</Typography>
        </div>
        <div>
          <ButtonGroup
            variant="outlined"
            size="large"
            aria-label="Medium-sized button group"
          >
            <OutlineButton
              color="primary"
              onClick={() => onView("week")}
              style={active === "week" ? activeClass : {}}
            >
              <Typography variant="body1">WEEK</Typography>
            </OutlineButton>
            <OutlineButton
              color="primary"
              onClick={() => onView("day")}
              style={active === "day" ? activeClass : {}}
            >
              <Typography variant="body1">DAY</Typography>
            </OutlineButton>
          </ButtonGroup>
        </div>
      </div>
    );
  };
  const handleSlotSelect = (slotInfo) => {};
  return (
    <ShadowBox
      className={styles.calendar_staff}
      sx={{
       
        "& .rbc-allday-cell": {
          mb: "-47px",
        },
        "& .rbc-time-slot": {
          border: "none !important",
        },
        "& .rbc-time-gutter > .rbc-timeslot-group > .rbc-time-slot ":{
           background:theme?.palette?.bgColor?.main
            }
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventRemove}
        defaultView="week"
        eventPropGetter={eventStyleGetter}
        popup
        style={{ padding: "10px", height: "100%"}}
        components={{
          toolbar: CustomToolbar,
        }}
       
        onView={(view) => setActive(view)}
      />
    </ShadowBox>
  );
};

export default StaffCalendar;
