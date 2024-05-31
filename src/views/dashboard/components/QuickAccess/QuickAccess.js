import React from "react";
import data from "./data";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { Typography } from "@mui/material";
import styles from "./Style.module.css";
const QuickAccess = () => {
  return ( 
    <>
      <ShadowBox className={styles.quickAccess}>
          <>
            <Typography
              className={styles.title}
              variant={"h5"}
              color={"text.primary"}
            >
              {data.title}
            </Typography>
          </>
        <div className={styles.line} />
        <div className={styles.firstRow}>
          {data.Data.map((item, index) => (
            <>
              <div className={styles.row}>
                <img src={item.image} alt="Image" className={styles.image} />
                <div className={styles.text}>
                  <Typography
                    variant={"subtitle1"}
                    color={"text.primary"}
                    sx={{ ml: 1 }}
                  >
                    {item.subtitle}
                  </Typography>
                  <Typography
                    variant={"body2"}
                    color={"text.secondary"}
                    sx={{ ml: 1 }}
                  >
                    {item.bodyText}
                  </Typography>
                </div>
                {index !== data.Data.length - 1 && <div className={styles.hline} />} 
              </div>
            </>
          ))}
        </div>
      </ShadowBox>
    </>
  );
};

export default QuickAccess;
