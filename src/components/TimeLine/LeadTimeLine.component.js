import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineTile from "./CardComponent/TimelineTile";
import {useTheme} from "@mui/styles";
import {convertStatusToColorCode} from "../../libs/Helper";


const LeadTimeLine = ({ data }) => {
    const theme = useTheme();
    return (
        // <ThemeProvider theme={theme}>
        <Timeline>
            {data?.map((dT) => {
                return (
                    <TimelineItem key={dT?.id} sx={[
                        {
                            "&::before": {
                                content: "none",
                            },
                        }
                    ]}>
                        <TimelineSeparator>
                            <TimelineDot sx={[
                                {
                                    "&": {
                                        backgroundColor: theme.palette.status[convertStatusToColorCode(dT.status)]
                                    }
                                }
                            ]} />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <TimelineTile data={dT}/>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
        // </ThemeProvider>
    );
};

export default LeadTimeLine;
