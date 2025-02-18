import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";
import axios from "axios";
import toast from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import Orders from "./component/Orders";
import ManageOrdersPage from "./component/ManageOrdersPage";
import AddOrderPage from "./component/AddOrderPage";
import AdminDashboard from "./component/AdminDashboard";
import GenerateSalesReports from "./component/GenerateSalesReports";
import UpdateOrder from "./component/UpdateOrder";
import AddUserPage from "./component/AddUserPage";
import ManageUsersPage from "./component/ManageUsersPage";
import UpdateUser from "./component/UpdateUser";
import SalesGraph from "./component/SalesGraph";
import UserOrders from "./component/UserOrders";
import RequestPage from "./component/RequestPage";
import LandingPage from "./component/LandingPage";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import UserRequestedProducts from "./component/UserRequestedProducts";
import Headerr from './component/Headerr';

const AppContent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  const location = useLocation();

  // Check if the current route is for authentication pages
  const isAuthPage =
    location.pathname === "/login_page" ||
    location.pathname === "/signup_page" ||
    location.pathname === "/";


  const isSpecialHeaderPage =
    location.pathname === "/user/requestOrder" ||
    location.pathname === "/user-requests" ||
    location.pathname === "/reports"; 

  
  const isUserOrdersPage = location.pathname === "/user/requestOrder" || location.pathname === "/user-requests" || location.pathname === "/reports";



  return (
    <>
      {!isAuthPage && (isSpecialHeaderPage ? <Headerr /> : <Header />)}
      {!isAuthPage ? (
        <div className="container">
          {!isUserOrdersPage && <Sidebar />}
          <div className="main-content">
            <Routes>
              <Route path="/orders" element={<Orders />} />
              <Route path="/manage-orders" element={<ManageOrdersPage />} />
              <Route path="/manage-users" element={<ManageUsersPage />} />
              <Route path="/add-order" element={<AddOrderPage />} />
              <Route path="/user/requestOrder" element={<UserOrders />} />
              <Route path="/user-requests" element={<UserRequestedProducts />} />
              <Route path="/approve" element={<RequestPage />} />
              <Route path="/update-order/:id" element={<UpdateOrder />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/sales-graph" element={<SalesGraph />} />
              <Route path="/reports" element={<GenerateSalesReports orders={orders} />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login_page" element={<SignIn />} />
          <Route path="/signup_page" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;


