import React, { useEffect, useState } from "react";
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
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const [salesData, setSalesData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        const orders = response.data;

        // Map API data to the required format
        const formattedData = orders.map((order) => ({
          product: order.productName,
          quantity: order.quantity,
        }));
        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: salesData.map((data) => data.product),
    datasets: [
      {
        label: "Quantity",
        data: salesData.map((data) => data.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product by Quantity",
      },
    },
  };

  return (
    <div className="sales-graph">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesGraph;
