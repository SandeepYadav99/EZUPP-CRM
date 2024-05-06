import styles from "./Style.module.css";
import { useMemo } from "react";
import { Typography } from "@mui/material";
import { PrimaryButton } from "../../../../components/Buttons/PrimaryButton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import StatusPill from "../../../../components/Status/StatusPill.component";
function TaskList({ data, item }) {
  const list = useMemo(() => {
    if (data?.length !== 0 && item === "taskList") {
      return (
        <>
          <div className={styles.addTaskwrapper}>
            <Typography
              component="span"
              variant="h4"
              color={"text.secondary"}
              align="end"
              sx={{ paddingTop: "5px" }}
            >
              My Task (3)
            </Typography>
            <div className={styles.taskListButtonWrapper}>
              <PrimaryButton size={"small"}>ADD Task</PrimaryButton>{" "}
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
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color={"text.secondary"}
                  >
                    {emp?.taskName}
                  </Typography>
                </div>
                <Typography variant="body2" color={"text.secondary"}>
                  {emp?.taskBody}
                </Typography>
                <div className={styles.TaskList}>
                  <div className={styles.IconDateBox}>
                    <WatchLaterIcon size="small" style={{ fontSize: 18 }} />
                    <Typography
                      component="span"
                      variant="subtitle3"
                      color={"text.secondary"}
                    >
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

                {/* <hr style={{width:"40%",border:" 2px solid #ebedf4"}}></hr> */}
              </div>
            );
          })}
        </>
      );
    }
  }, [data, item]);
  return <div className={styles.paperBackground}>{list} </div>;
}
export default TaskList;
