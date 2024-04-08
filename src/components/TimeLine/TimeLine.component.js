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
                <TimelineContent>
                  <div
                    className={`${
                      id === 0 ? styles?.underline : styles.underlineOther
                    }`}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#636578", fontWeight: "500" }}
                    >
                      {val?.heading}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#bbbcc4" }}>
                      {val?.date}
                    </Typography>
                  </div>
                  <div className={styles?.underline2}>
                    <Typography variant="subtitle1" sx={{ color: "#636578" }}>
                      {val?.t1}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#bbbcc4" }}>
                      {val?.time}
                    </Typography>
                  </div>
                  <div className={styles.underline3}>
                    <Typography variant="subtitle1" sx={{ color: "#6E6E6E" }}>
                      {val?.t1} <br /> 
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </ShadowBox>
    </ThemeProvider>
  );
};

export default TimelineComponent;
