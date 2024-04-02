import React from "react";
import { Doughnut } from "react-chartjs-2";
import PageBox from "../PageBox/PageBox.component";

const data = {
  labels: ["Not Opened", "Opened", "Total Sent"],

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
  responsive: true,
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
  <PageBox>
    <Doughnut data={data} options={options} />
  </PageBox>
);

export default DoughnutChart;
