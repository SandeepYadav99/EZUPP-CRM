import React from "react";
import { Doughnut } from "react-chartjs-2";

import styles from "./Styles.module.css";
import { Typography } from "@mui/material";

const data = {
  datasets: [
    {
      data: [8, 2],
      backgroundColor: ["#20C997"],
      borderColor: [],
      borderWidth: 0.5,
      hoverOffset: 4,
      cutout: "90%",
    },
  ],
};

const options = {
  responsive: false,
  type: "doughnut",
  cutout: "90%",
  cutoutPercentage: 80,
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
      borderWidth: 0.5,
      cornerRadius: 10,
      borderSkipped: (ctx) => (ctx.raw.angle > Math.PI ? 20 : 0),
    },
  },
};

const HalfDoughnutChart = () => {
  return (
    <div className={styles.container}>
      <Doughnut data={data} options={options} height={"100px"} />
      <div className={styles.divContainer}>
         <Typography variant="h2">80%</Typography>
         <Typography variant="h6">Progress</Typography>

      </div>
    </div>
  );
};

export default HalfDoughnutChart;
