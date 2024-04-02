import React from "react";
import { Doughnut } from "react-chartjs-2";
import PageBox from "../PageBox/PageBox.component";
import { StylesContext } from "@mui/styles";
import styles from "./Styles.module.css";

const data = {
  datasets: [
    {
      data: [8, 24, 10],
      backgroundColor: ["#5F63F2", "#FA8B0C", "#20C997"],
      borderColor: ["#5F63F2", "#FA8B0C", "#20C997"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: false,
  cutout: '50%', 
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
};



const DoughnutChart = () => (
  <div className={styles.container}>
    <Doughnut data={data} options={options} height={"150px"}/>
  </div>
);

export default DoughnutChart;
