import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import jsonData from "./TimeLine.json";
import styles from "./Style.module.css";
import PdfMeeting from "./CardComponent/Pdf.component";
import MeetingCard from "./CardComponent/MeetingCard";
import CreateMeeting from "./CardComponent/CreateMeeting";

const theme = createTheme({
  components: {
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          "&::before": {
            content: "none",
          },
          ".MuiTimelineDot-root": {
            backgroundColor: "rgb(25, 118, 210)",
          },
          ".MuiTimelineConnector-root": {
            backgroundColor: "#eaeaec",
          },
          ".yellow": {
            backgroundColor: "#72e128",
          },
        },
      },
    },
  },
});

const TimelineComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <ShadowBox className={styles.containerData}>
        <span className={styles.heading}>Basic Timeline</span>
        <Timeline>
          {jsonData?.data?.map((val, id) => {
            return (
              <TimelineItem key={id}>
                <TimelineSeparator>
                  <TimelineDot
                    className={`${
                      id === 0
                        ? styles.firstColor
                        : id === 1
                        ? styles.yellow
                        : id === 2
                        ? styles.green
                        : id === 3
                        ? styles.orange
                        : id === 4
                        ? styles.red
                        : styles.firstColor
                    }`}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                {val?.type === "pdf" ? (
                  <TimelineContent>
                    <PdfMeeting data={val} />{" "}
                  </TimelineContent>
                ) : val?.type === "meeting" ? (
                  <TimelineContent>
                    <MeetingCard data={val} />{" "}
                  </TimelineContent>
                ) : (
                  <TimelineContent>
                    <CreateMeeting data={val} />{" "}
                  </TimelineContent>
                )}
              </TimelineItem>
            );
          })}
        </Timeline>
      </ShadowBox>
    </ThemeProvider>
  );
};

export default TimelineComponent;
