import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controller/orderController.js";

const route = express.Router();

route.post("/order", createOrder); // Endpoint to create a new order
route.get("/orders", getAllOrders); // Endpoint to retrieve all orders
route.get("/order/:id", getOrderById); // Endpoint to retrieve a specific order by ID
route.put("/update/order/:id", updateOrder); // Endpoint to update an order by ID
route.delete("/delete/order/:id", deleteOrder); // Endpoint to delete an order by ID

export default route;

