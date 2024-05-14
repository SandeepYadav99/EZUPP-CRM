import styles from "./Meeting.module.css";
import PdfImage from "../../../assets/CRMAssets/PdfImage.png";
import { Avatar } from "@mui/material";

const MeetingCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.heading1}>{data?.heading}</span>
        <span className={styles.timeLine}>{data?.time}</span>
      </div>
      <span className={styles.timeLine}>{data?.t1}</span>
      <div className={styles.avatarRow}>
        <Avatar
          className={styles.avatar_size}
          src={require("../../../assets/img/1.png")}
          alt=""
          sx={{ width: 44, height: 44 }}
          variant="circular"
        />
        <div className={styles.textFinal}>
          <span className={styles.timeLine}>{data?.about}</span>
          <span className={styles.timeLine}>{data?.designation}</span>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
