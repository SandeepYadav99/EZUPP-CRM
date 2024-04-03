import PageBoxComponent from "../../../../components/PageBox/PageBox.component";
import DoughnutChart from "../../../../components/GraphFile/DougnutGraph";
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Paper,
    Button,
    ButtonBase,
  } from "@mui/material";
import styles from "./Style.module.css";

const GraphComponent =()=>{
    return (
        <div className={styles.paper}>
        <div className={styles.headerAlign}>
          <div>
            <Typography variant={"subtitle1"}> Quotes</Typography>
          </div>
          <div className={styles.alignDataValue}>
            <Typography variant={"subtitle2"}> Today</Typography>
            <Typography variant={"subtitle2"}> Week </Typography>
            <Typography variant={"subtitle2"}> Month</Typography>
            <Typography variant={"subtitle2"} className={styles.underLine}> Year</Typography>
          </div>
        </div>
        <DoughnutChart />
        <div className={styles.wrapComponent}>
          <div className={styles.cardComponent}>
            <div className={styles.bgColor1}></div>
            <div>
              <Typography variant={"h5"}> 9483</Typography>
              <Typography variant={"caption"}> Total Sent</Typography>
            </div>
          </div>
          <div className={styles.cardComponent}>
            <div className={styles.bgColor2}></div>
            <div>
              <Typography variant={"h5"}> 13870</Typography>
              <Typography variant={"caption"}> Opened</Typography>
            </div>
          </div>
          <div className={styles.cardComponent}>
            <div className={styles.bgColor3}></div>
            <div>
              <Typography variant={"h5"}> 15420</Typography>
              <Typography variant={"caption"}> Not Opened</Typography>
            </div>
          </div>
        </div>
      </div>    )
}

export default GraphComponent;