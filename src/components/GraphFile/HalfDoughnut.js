import React from "react";
import { Doughnut } from "react-chartjs-2";
import PageBox from "../PageBox/PageBox.component";
import { StylesContext } from "@mui/styles";
import styles from "./Styles.module.css";

const data = {
  datasets: [
    {
      data: [8,2],
      backgroundColor: ["#20C997"],
      borderColor: [],
      borderWidth: 4,
      hoverOffset: 4,
    },
  ],
};

const options = {
  responsive: false,
  cutout: 0, 
  rotation: 1 * Math.PI, 
  circumference: 1 * Math.PI, 
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Custom Doughnut Chart",
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    arc: {
      borderWidth: 4, 
      cornerRadius: 10, 
      borderSkipped: ctx => ctx.raw.angle > Math.PI ? 20 : 0,
    },
  },
};

const HalfDoughnutChart = () => {
 
  return (
    <div className={styles.container}>
      <Doughnut data={data} options={options} height={"100px"} />
    </div>
  );
};

export default HalfDoughnutChart;
