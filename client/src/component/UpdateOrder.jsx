import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateOrder = () => {
  const initialOrderState = {
    customerName: "",
    productName: "",
    quantity: "",
    price: "",
  };

  const [order, setOrder] = useState(initialOrderState);
  const [updatedAt, setUpdatedAt] = useState(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order/${id}`)
      .then((response) => {
        setOrder(response.data);
        const storedUpdateTime = localStorage.getItem(`orderUpdatedAt-${id}`);
        if (storedUpdateTime) {
          setUpdatedAt(storedUpdateTime);
        }
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        toast.error("Failed to load order details.");
      });
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/order/${id}`, order);
      const now = new Date().toLocaleString(); // Get current time
      setUpdatedAt(now);
      localStorage.setItem(`orderUpdatedAt-${id}`, now); // Store in localStorage
      toast.success("Order updated successfully!");
      navigate("/manage-orders");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order.");
    }
  };

  return (
    <div className="main-content">
      <header className="abu">
        <h1>Update Order</h1>
      </header>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "10px",
          backgroundColor: "#f3f3f3",
          padding: "8px",
          borderRadius: "5px",
          display: "inline-block",
        }}
      >
        Last Updated: {updatedAt || "Not updated yet"}
      </p>
      <form onSubmit={submitForm}>
        <label>Customer Name</label>
        <input
          className="search-box"
          type="text"
          name="customerName"
          value={order.customerName}
          onChange={inputHandler}
        />
        <label>Product Name</label>
        <input
          className="search-box"
          type="text"
          name="productName"
          value={order.productName}
          onChange={inputHandler}
        />
        <label>Quantity</label>
        <input
          className="search-box"
          type="number"
          name="quantity"
          value={order.quantity}
          onChange={inputHandler}
        />
        <label>Price</label>
        <input
          className="search-box"
          type="number"
          name="price"
          value={order.price}
          onChange={inputHandler}
        />
        <button type="submit" className="edit-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
