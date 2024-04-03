import PageBoxComponent from "../../../../components/PageBox/PageBox.component";
import HalfDoughnutChart from "../../../../components/GraphFile/HalfDoughnut";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  ButtonBase,
} from "@mui/material";
import styles from "./Styles.module.css";
import dotImage from "../../../../assets/CRMAssets/ic_kebab_menu.png";

const HalfDoughnut = () => {
  return (
    <div className={styles.paper}>
      <div className={styles.headerAlign}>
        <div className={styles.containerSpace}>
          <Typography variant={"subtitle1"}> Monthly Sales Target</Typography>
        </div>
        <div className={styles.alignDataValue}>
        <img src={dotImage} alt="imageText" height={'15px'}/>
        </div>
      </div>
      <HalfDoughnutChart />
      <div className={styles.wrapComponent}>
        <div className={styles.cardComponent}>
          <Typography className={styles.bgColor1} variant={"h2"} >
            $5,870
          </Typography>
          <div>
            <Typography variant={"h5"}> Revenue</Typography>
          </div>
        </div>
        <div className={styles.cardComponent}>
          <Typography className={styles.bgColor2} variant={"h2"}>
            $7,870
          </Typography>
          <div>
            <Typography variant={"h5"}> Target</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfDoughnut;
