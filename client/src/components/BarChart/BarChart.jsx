import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { StoreContext } from "../../context/Store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { records } = useContext(StoreContext);

  const creditedRecords = records.filter(
    (record) => record.isCreditedOrDebited === "credited"
  );
  const debitedRecords = records.filter(
    (record) => record.isCreditedOrDebited === "debited"
  );

  const data = {
    labels: ["Credited", "Debited"],
    datasets: [
      {
        label: "Amount",
        data: [
          creditedRecords.reduce((total, record) => total + record.amount, 0),
          debitedRecords.reduce((total, record) => total + record.amount, 0),
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
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
        text: "Total Credited and Debited Amounts",
      },
    },
  };

  return (
    <div>
      <Bar className="graph" data={data} options={options} />
    </div>
  );
};

export default BarChart;
