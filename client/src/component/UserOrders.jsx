import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import "../CSS/userOrder.css";

Modal.setAppElement("#root");

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [desiredQuantity, setDesiredQuantity] = useState(0);

  const userData = JSON.parse(localStorage.getItem("Data"));
  console.log(userData);

  // Fetch orders from backend
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

  // Handle order request submission
  const handleOrderRequest = async () => {
    if (!desiredQuantity || desiredQuantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (desiredQuantity > selectedProduct.quantity) {
      toast.error("Requested quantity exceeds available stock.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/approval", {
        username: userData.username,
        productName: selectedProduct.productName,
        quantity: desiredQuantity,
        date: new Date().toISOString(),
        approvalStatus: "Pending",
      });
      toast.success("Order request sent successfully!");
      setSelectedProduct(null);
      setDesiredQuantity(0);
    } catch (error) {
      console.error("Error submitting order request:", error);
      toast.error("Failed to send order request.");
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <Toaster />
      <header>
        <h1>Available Orders</h1>
      </header>
      <input
        className="search-box"
        type="text"
        placeholder="Search by Product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredOrders.length === 0 ? (
        <p>No products found. Please check back later.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Available Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>
                  <button
                    onClick={() => setSelectedProduct(order)}
                    className="btn btn-primary"
                  >
                    Order Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onRequestClose={() => setSelectedProduct(null)}
          contentLabel="Order Request Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Order Request</h2>
          <p>
            <strong>Product:</strong> {selectedProduct.productName}
          </p>
          <p>
            <strong>Available Quantity:</strong> {selectedProduct.quantity}
          </p>
          <input
            type="number"
            placeholder="Enter desired quantity"
            value={desiredQuantity}
            onChange={(e) => setDesiredQuantity(Number(e.target.value))}
          />
          <div className="modal-actions">
            <button onClick={handleOrderRequest} className="btn btn-success">
              Submit Request
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserOrders;
