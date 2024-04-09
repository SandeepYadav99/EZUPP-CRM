import { useMemo } from "react";
import styles from "./Style.module.css";
import { Typography } from "@mui/material";
function MessageCard({ data, item }) {
  const list = useMemo(() => {
    return data?.map((emp) => {
      if (data?.length !== 0 && item === "messages")
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
                {" "}
                <Typography component="span" variant="subtitle2">
                  {emp?.date}
                </Typography>
              </div>
            </div>
          </div>
        );
    });
  }, [data, item]);
  return <div className={styles.paperBackground}>{list} </div>;
}
export default MessageCard;
