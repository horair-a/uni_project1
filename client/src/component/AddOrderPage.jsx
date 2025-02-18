import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddOrderPage = () => {
  const initialOrderState = {
    customerName: "",
    productName: "",
    quantity: "",
    price: "",
  };

  const [order, setOrder] = useState(initialOrderState);
  const navigate = useNavigate();

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/order", order);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/orders"); // Navigate to the home or orders page after successful submission
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <header className="abu">
        <h1>Add Product</h1>
      </header>
      <form onSubmit={submitForm}>
        <label>Seller Name</label>
        <input
          className="search-box"
          type="text"
          name="customerName"
          placeholder="Sellar Name"
          value={order.customerName}
          onChange={inputHandler}
        />
        <label>Product Name</label>
        <input
          className="search-box"
          type="text"
          name="productName"
          placeholder="Product Name"
          value={order.productName}
          onChange={inputHandler}
        />
        <label>Quantity</label>
        <input
          className="search-box"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={order.quantity}
          onChange={inputHandler}
        />
        <label>Price</label>
        <input
          className="search-box"
          type="number"
          name="price"
          placeholder="Price"
          value={order.price}
          onChange={inputHandler}
        />
        <button type="submit" className="edit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddOrderPage;
