import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserRequestedProducts = () => {
  const [requests, setRequests] = useState([]);
  const userData = JSON.parse(localStorage.getItem("Data"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/approvals");
        const userRequests = response.data.filter(
          (request) => request.username === userData.username
        );

        const approvalTimes =
          JSON.parse(localStorage.getItem("ApprovalTimes")) || {};

        const updatedRequests = userRequests.map((request) => {
          if (
            (request.approvalStatus === "Approved" ||
              request.approvalStatus === "Rejected") &&
            !approvalTimes[request._id]
          ) {
            approvalTimes[request._id] = new Date().toISOString();
          }
          return {
            ...request,
            decisionTime: approvalTimes[request._id] || null,
          };
        });

        localStorage.setItem("ApprovalTimes", JSON.stringify(approvalTimes));

        setRequests(updatedRequests);
      } catch (error) {
        console.error("Error fetching user requests:", error);
        toast.error("Failed to load requested products.");
      }
    };
    fetchUserRequests();
  }, []);

  return (
    <div className="main-content">
      <Toaster />
      <header>
        <h1>My Requested Products</h1>
      </header>
      {requests.length === 0 ? (
        <p>No requested products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Requested Quantity</th>
              <th>Request Date</th>
              <th>Approval Status</th>
              <th>Decision Time</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.productName}</td>
                <td>{request.quantity}</td>
                <td>{new Date(request.date).toLocaleString()}</td>
                <td
                  className={
                    request.approvalStatus === "Approved"
                      ? "approved"
                      : request.approvalStatus === "Rejected"
                      ? "rejected"
                      : "pending"
                  }
                >
                  {request.approvalStatus}
                </td>
                <td>
                  {request.decisionTime
                    ? new Date(request.decisionTime).toLocaleString()
                    : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className="order-button"
        onClick={() => navigate("/user/requestOrder")}
      >
        Request New Product
      </button>
    </div>
  );
};

export default UserRequestedProducts;
