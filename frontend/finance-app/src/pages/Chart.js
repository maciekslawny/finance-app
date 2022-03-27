import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Sum",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 4,
    },
    {
      label: "Revenue",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
      hidden: true,
    },
    {
      label: "Expense",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
      hidden: true,
    },
  ],
};

const Chart = () => {
  const [monthsList, setMonthsList] = useState([]);
  const [sumList, setSumList] = useState([]);
  const [revenueList, setRevenueList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    axiosInstance.get("finances/statistic-info").then((res) => {
      setSumList(res.data.sum_list);
      setMonthsList(res.data.months_list);
      setRevenueList(res.data.revenue_list);
      setExpenseList(res.data.expense_list);
    });
  }, [setSumList]);

  data.labels = monthsList;
  data.datasets[0]["data"] = sumList;
  data.datasets[1]["data"] = revenueList;
  data.datasets[2]["data"] = expenseList;

  return (
    <div className="d-flex justify-content-center">
      {sumList.length > 0 &&
      revenueList.length > 0 &&
      expenseList.length > 0 ? (
        <div className="w-75">
          <Line data={data} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Chart;
