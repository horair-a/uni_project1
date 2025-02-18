import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [render, setRender] = useState(false);

  // Fetch product requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/approvals");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching product requests:", error);
      }
    };
    fetchRequests();
  }, [render]);

  // Function to handle approval/rejection
  const handleApproval = async (request, actionType) => {
    try {
      const payload = {
        username: request.username,
        productName: request.productName,
        quantity: request.quantity,
        approvalType: actionType, // "Approve" or "Reject"
      };

      const response = await axios.put("http://localhost:8000/api/updateApproval", payload);

      if (response.status === 200) {
        alert(`Request ${actionType}d successfully!`);
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== request._id)
        );
        setRender(!render);
      }
    } catch (error) {
      console.error(`Error ${actionType.toLowerCase()}ing request:`, error);
      alert(`Failed to ${actionType} the request.`);
    }
  };

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
      request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <header>
        <h1>Requested Products</h1>
      </header>
      <input
        className="search-box"
        type="text"
        placeholder="Search by Username or Product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredRequests.length === 0 ? (
        <p>No product requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.username}</td>
                <td>{request.productName}</td>
                <td>{request.quantity}</td>
                <td>{new Date(request.date).toLocaleString()}</td>
                <td>{request.approvalStatus || "Pending"}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleApproval(request, "Approved")}
                    disabled={request.approvalStatus === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleApproval(request, "Rejected")}
                    disabled={request.approvalStatus === "Rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestPage;
