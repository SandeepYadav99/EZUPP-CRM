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

import imageLogo2 from "../../../../assets/Assets/ic_task_list_blue.png";
import { Padding } from "@mui/icons-material";

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
    } else if (data?.length !== 0 && item === "taskList") {
      return (
        <>
          <div className={styles.birthdayEventWrapper}>
            <Typography component="span" variant="h4" align="end">
              My Task (3)
            </Typography>
            <div className={styles.taskListButtonWrapper}>
              <PrimaryButton variant="">ADD Task</PrimaryButton>{" "}
              <div style={{ display: "flex" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  className={styles.dropdownButtonLabel}
                >
                  ALL
                </InputLabel>{" "}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value
                  label="ALL"
                  onChange
                ></Select>
              </div>
            </div>
          </div>
          {data?.map((emp) => {
            return (
              <div className={styles.TaskListEventWrapper}>
                <div>
                  <Checkbox sx={{ paddingLeft: "0" }} size="medium" />
                  <Typography component="span" variant="subtitle1">
                    {emp?.taskName}
                  </Typography>
                </div>
                <Typography variant="body1">{emp?.taskBody}</Typography>
                <div className={styles.TaskList}>
                  <div className={styles.IconDateBox}>
                    <WatchLaterIcon size="small" style={{ fontSize: 18 }} />
                    <Typography component="span" variant="subtitle2">
                      {emp?.date}
                    </Typography>
                  </div>
                  <div className={styles.buttonsBox}>
                    {emp?.status === "high" ? (
                      <StatusPill status={"High"} color={"high"} />
                    ) : emp?.status === "medium" ? (
                      <StatusPill status={"Medium"} color={"medium"} />
                    ) : (
                      <StatusPill status={"Low"} color={"low"} />
                    )}
                    <StatusPill status={"Discuss"} color={"Discuss"} />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
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
                  <Typography component="span" variant="h5">
                    {emp?.name}
                  </Typography>

                  <Typography component="span" variant="body2">
                    {emp?.designation}
                  </Typography>
                </div>
              </div>
              <div className={styles.iconCardsBoxContainer}>
                {item === "contact" ? (
                  <div className={styles.iconCardsBox}>
                    <img className={styles.iconCards} src={imageLogo1} alt="" />
                    <img className={styles.iconCards} src={imageLogo2} alt="" />
                    <img className={styles.iconCards} src={imagelogo3} alt="" />
                  </div>
                ) : (
                  <Typography component="span" variant="subtitle2">
                    {emp?.date}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        );
      });
    }
  }, [data, item]);

  return <div className={styles.paperBackground}>{list} </div>;
}

export default EventCard;
