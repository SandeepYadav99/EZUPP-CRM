import React, { useMemo } from "react";
import styles from "./Style.module.css";
// import noEvent from "./../../../../../assets/img/ic_no event today.png";
import imagelogo3 from "../../../../assets/Assets/ic_call.png";
import { Typography } from "@mui/material";
import { PrimaryButton } from "../../../../components/Buttons/PrimaryButton";
import { Checkbox } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { ActionButton } from "../../../../components/Buttons/PrimaryButton";
import StatusPill from "../../../../components/Status/StatusPill.component";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import imageLogo1 from "../../../../assets/Assets/ic_contacts_blue.png";
import calender from "../../../../assets/Assets/ic_calendar.png";
import avatar from "../../../../assets/Assets/avatar 1.png";
import avatar1 from "../../../../assets/Assets/avatar 2.png";
import imageLogo2 from "../../../../assets/Assets/ic_task_list_blue.png";
import { Padding } from "@mui/icons-material";
import { makeStyles, useTheme } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";

function EventCard({ data, item }) {
  const list = useMemo(() => {
    if (data?.length === 0) {
      return (
        <div className={styles.noEventWrapper}>
          <div className={styles.noEvent}>
            {/* <img src={noEvent} /> */}
            <span>No Events for Today!</span>
          </div>
        </div>
      );
      // } else if (data?.length !== 0 && item === "taskList") {
      //   return (
      //     <>
      //       <div className={styles.birthdayEventWrapper}>
      //         <Typography component="span" variant="h4" align="end" sx={{paddingTop:"5px"}}>
      //           My Task (3)
      //         </Typography>
      //         <div className={styles.taskListButtonWrapper}>
      //           <PrimaryButton variant="">ADD Task</PrimaryButton>{" "}
      //           <div style={{ display: "flex" }}>
      //             <InputLabel
      //               id="demo-simple-select-label"
      //               className={styles.dropdownButtonLabel}
      //             >
      //               ALL
      //             </InputLabel>{" "}
      //             <Select
      //               labelId="demo-simple-select-label"
      //               id="demo-simple-select"
      //               value
      //               label="ALL"
      //               onChange
      //             ></Select>
      //           </div>
      //         </div>
      //       </div>
      //       {data?.map((emp) => {
      //         return (
      //           <div className={styles.TaskListEventWrapper}>
      //             <div>
      //               <Checkbox sx={{ paddingLeft: "0" }} size="medium" />
      //               <Typography component="span" variant="subtitle1">
      //                 {emp?.taskName}
      //               </Typography>
      //             </div>
      //             <Typography variant="body1">{emp?.taskBody}</Typography>
      //             <div className={styles.TaskList}>
      //               <div className={styles.IconDateBox}>
      //                 <WatchLaterIcon size="small" style={{ fontSize: 18 }} />
      //                 <Typography component="span" variant="subtitle2">
      //                   {emp?.date}
      //                 </Typography>
      //               </div>
      //               <div className={styles.buttonsBox}>
      //                 {emp?.status === "high" ? (
      //                   <StatusPill status={"High"} color={"high"} />
      //                 ) : emp?.status === "medium" ? (
      //                   <StatusPill status={"Medium"} color={"medium"} />
      //                 ) : (
      //                   <StatusPill status={"Low"} color={"low"} />
      //                 )}
      //                 <StatusPill status={"Discuss"} color={"Discuss"} />
      //               </div>

      //             </div>

      //             {/* <hr style={{width:"40%",border:" 2px solid #ebedf4"}}></hr> */}
      //           </div>

      //         );
      //       })}
      //     </>
      //   );
    } else {
      return data?.map((emp) => {
        // console.log(emp, "eventcard");
        return (
          <div className={styles.birthdayEventWrapper}>
            <div className={styles.parentWrapper}>
              <div className={styles.imageNameContainer}>
                <div>
                  <img src={emp?.image} className={styles.userImage} alt="" />
                </div>
                <div className={styles.profileContainer}>
                  {/* <span className={styles.profileName}>{emp?.name}</span> */}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color={"text.secondary"}
                  >
                    {emp?.name}
                  </Typography>

                  <Typography
                    component="span"
                    variant="body2"
                    color={"text.secondary"}
                  >
                    {emp?.designation}
                  </Typography>
                </div>
              </div>
              <div className={styles.iconCardsBoxContainer}>
                {/* {item === "contact" ? ( */}
                <div className={styles.iconCardsBox}>
                  {/* <img className={styles.iconCards} src={imageLogo1} alt="" /> */}
                  <AccountCircleIcon color="primary" />
                  {/* <img className={styles.iconCards} src={imageLogo2} alt="" /> */}
                  <NoteAddRoundedIcon sx={{ color: "#FF7700" }} />
                  {/* <img className={styles.iconCards} src={imagelogo3} alt="" /> */}
                  <CallRoundedIcon color="secondary" />
                </div>
                {/* ) : (
                  <Typography component="span" variant="subtitle2">
                    {emp?.date}
                  </Typography>
                )} */}
              </div>
            </div>

            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div className={styles.gap}>
                <img src={avatar} alt="Image" style={{ marginRight: "10px" }} />
                <div>
                  <Typography
                    variant={"h5"}
                    color={"text.secondary"}
                    sx={{ mb: 0.3 }}
                  >
                    {item.subtitle}
                  </Typography>
                  <div className={styles.date}>
                    <img src={calender} alt="Image" />
                    <Typography
                      variant={"body2"}
                      color={"text.secondary"}
                      sx={{ ml: 1 }}
                    >
                      {item.Date}
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <StatusPill status={"Business"} color={"business"} />
              </div>
            </div> */}

            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div className={styles.gap}>
                <img
                  src={avatar1}
                  alt="Image"
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <Typography
                    variant={"h5"}
                    color={"text.secondary"}
                    sx={{ mb: 0.3 }}
                  >
                    {item.subtitle2}
                  </Typography>
                  <div className={styles.date}>
                    <img src={calender} alt="Image" />
                    <Typography
                      variant={"body2"}
                      color={"text.secondary"}
                      sx={{ ml: 1 }}
                    >
                      {item.Date}
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <StatusPill status={"Payment"} color={"low"} />
              </div>
            </div> */}
          </div>
        );
      });
    }
  }, [data, item]);

  return <div className={styles.paperBackground}>{list} </div>;
}

export default EventCard;
