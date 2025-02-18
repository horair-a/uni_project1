import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SalesGraph from "./SalesGraph";
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [salesData, setSalesData] = useState([]);

  // Fetch orders and users
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await axios.get(
          "http://localhost:8000/api/orders"
        );
        setOrders(ordersResponse.data);

        // Calculate sales data for graph
        const sales = calculateSales(ordersResponse.data);
        setSalesData(sales);
        const usersResponse = await axios.get(
          "http://localhost:8000/api/signup"
        );

        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data.");
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate sales by product for graph
  const calculateSales = (orders) => {
    const salesMap = {};
    orders.forEach((order) => {
      if (salesMap[order.productName]) {
        salesMap[order.productName] += order.price * order.quantity;
      } else {
        salesMap[order.productName] = order.price * order.quantity;
      }
    });
    return Object.entries(salesMap).map(([product, sales]) => ({
      product,
      sales,
    }));
  };

  const stats = {
    totalOrders: orders.length,
    totalEmployees: users.length - 1,
  };

  return (
    <div className="main-content">
      <header>
        <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      </header>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          Total Products
          <br />
          <b>{stats.totalOrders}</b>
        </div>
        <div className="stat-card">
          Total Product Inquiry
          <br />
          <b>{stats.totalEmployees}</b>
        </div>
      </div>

      {/* Orders Table */}
      <h2>Products</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 10).map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Products</h2>
      {salesData.length === 0 ? (
        <p>No sales data available.</p>
      ) : (
        <SalesGraph salesData={salesData} />
      )}
    </div>
  );
};

export default AdminDashboard;
