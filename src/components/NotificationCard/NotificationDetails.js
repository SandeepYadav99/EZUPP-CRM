import React from "react";
import ShadowBox from "../ShadowBox/ShadowBox";
import { Typography } from "@mui/material";
import styles from "./Style.module.css";
import data from "./Data";
const NotificationDetails = () => {
  const repeatedData = [

    data.Data[0],
  ...Array(3).fill(data.Data[1]),
  data.Data[0],
  ...Array(2).fill(data.Data[1]),
  ];
  return (
    <ShadowBox className={styles.notBox}>
      <Typography variant={"title"}>All Notifications</Typography>

      <div className={styles.box1}>
        {repeatedData.map((item, index) => (
         <div key={index} className={styles.rowContainer}>
          <div className={`${styles.row}  ${index !== repeatedData.length - 1 ? styles.line : ''}`}>
            <img
              src={item.image}
              alt="Image"
              className={styles.image}
              crossOrigin="anonymous"
            />
            <div className={styles.textContainer}>
              <div className={styles.row1}>
                <Typography variant={"subtitle1"}>{item.title}</Typography>
              
                <div className={styles.right}>
                  <Typography variant={"body3"}>{item.dateTime}</Typography>
                </div>
              </div>
              <Typography variant={"subtitle1"} color={"text.secondary"} sx={{mb: 1}}>
                {item.body}
              </Typography>
             
            </div> 
          </div>
          {/* {index !== repeatedData.length - 1 && <div className={styles.line} />} */}
          </div>
        ))}
      </div>
    </ShadowBox>
  );
};

export default NotificationDetails;
