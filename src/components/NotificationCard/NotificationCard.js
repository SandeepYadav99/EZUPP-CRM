import React, { useCallback, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import {useTheme} from "@mui/styles";
import { NotiList } from "../../helper/Helper";
import styles from "./Style.module.css";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import NotificationDetailsHook from "./NotificationDetailsHook";
import ShadowBox from "../ShadowBox/ShadowBox";

function NotificationCard() {
  const listData = [...NotiList];
  const {
    handleDetail,
  } = NotificationDetailsHook({});
  const theme = useTheme();
  const Card = useCallback(
    ({ data }) => {
      return (
        <div
          component="div"
          // key={`Notification_card${index}`}
          className={styles.parentWrapper}
          
        >
          <div className={styles.left}>
            <Avatar
              className={styles.avatar}
              src={require("../../assets/img/1.png")}
              alt=""
              sx={{ width: 40, height: 40 }}
            />
            <div className={styles.desWrap}>
              <Typography
                component="div"
                variant="body2"
                className={styles.desWrap2}
                
              >
                {data?.title}
              </Typography>{" "}
              <Typography
                component="div"
                variant="body2"
                className={styles.desWrap2}
               
              >
                {data?.body}
              </Typography>
            </div>
          </div>
          <div>
            <Typography component="div" variant="body2">
              {data?.dateTime}
            </Typography>
          </div>
        </div>
      );
    },
    [listData]
  );
  return (
  
    <div>
      
      <div className={styles.upperCard}  >
     
        <Typography
          //   color={"text.secondary"}
          variant="subtitle1"
          component="div"
        
        >
          Notification
        </Typography>
        <div>
          <span className={styles.icons}>8 New</span>
        </div>
      </div>
      {listData?.map((item, index) => (
        <Card data={item} key={`list_${index}`} />
      ))}
      <div className={styles.btnWrapp}>
        <PrimaryButton style={{ width: "100%" }} >
          <Typography variant="body1" onClick={handleDetail} >VIEW ALL NOTIFICATIONS</Typography>
        </PrimaryButton>
      </div>
    </div>
 
  );
}

export default NotificationCard;
