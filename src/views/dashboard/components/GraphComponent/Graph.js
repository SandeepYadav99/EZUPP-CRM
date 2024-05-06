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
import { useState } from "react";

const GraphComponent =()=>{
  const [indexData,setIndexData] = useState(3)

    return (
        <div className={styles.paper}>
        <div className={styles.headerAlign}>
          <div>
            <Typography variant={"subtitle1"}> Quotes</Typography>
          </div>
          <div className={styles.alignDataValue}>
            <Typography variant={"subtitle2"} onClick={()=>setIndexData(0)} className={`${indexData===0 &&  styles.underLine}`}> Today</Typography>
            <Typography variant={"subtitle2"} onClick={()=>setIndexData(1)} className={`${indexData===1 && styles.underLine}`}> Week </Typography>
            <Typography variant={"subtitle2"} onClick={()=>setIndexData(2)} className={`${indexData===2 && styles.underLine}`}> Month</Typography>
            <Typography variant={"subtitle2"} onClick={()=>setIndexData(3)} className={`${indexData===3 && styles.underLine}`}> Year</Typography>
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