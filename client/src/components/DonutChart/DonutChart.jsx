import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { StoreContext } from "../../context/Store";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const { records } = useContext(StoreContext);

  const creditedTotal = records
    .filter((record) => record.isCreditedOrDebited === "credited")
    .reduce((total, record) => total + record.amount, 0);

  const debitedTotal = records
    .filter((record) => record.isCreditedOrDebited === "debited")
    .reduce((total, record) => total + record.amount, 0);

  const data = {
    labels: ["Credited", "Debited"],
    datasets: [
      {
        label: "Total Amount",
        data: [creditedTotal, debitedTotal],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Credited and Debited Amounts",
      },
    },
    cutout: "70%",
  };

  return (
    <div>
      <Doughnut className="graph" data={data} options={options} />
    </div>
  );
};

export default DonutChart;
