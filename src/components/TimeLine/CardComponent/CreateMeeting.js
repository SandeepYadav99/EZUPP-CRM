import styles from "./Create.module.css";
import { UserCountAvatarsLableAvatarGroup } from "../../AvatarGroup/AvatarGroup";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";

const CreateMeeting = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.heading1}>{data?.heading}</span>
        <span className={styles.timeLine}>{data?.time}</span>
      </div>
      <span className={styles.timeLine}>{data?.t1}</span>
      <div className={styles.avaterAlignment}>
        <AvatarGroup max={4} className={styles.avatar_group2}>
          <Avatar className={styles.avatar}>
            <img
              src={require("../../../assets/img/1.png")}
              alt={""}
              className={styles.pull_up}
            />
          </Avatar>

          <Avatar className={styles.avatar}>
            <img src={require("../../../assets/img/4.png")} alt={""} />
          </Avatar>

          <Avatar className={styles.avatar}>
            <img src={require("../../../assets/img/5.png")} alt={""} />
          </Avatar>

          <Tooltip title="+3 More" placement="bottom">
            <Avatar className={styles.avatar}>+3</Avatar>
          </Tooltip>
        </AvatarGroup>
      </div>
    </div>
  );
};

export default CreateMeeting;
