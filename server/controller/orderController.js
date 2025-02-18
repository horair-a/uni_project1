import Order from "../model/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const { customerName, productName } = newOrder;

    const orderExist = await Order.findOne({ customerName, productName });
    if (orderExist) {
      return res.status(400).json({ message: "Order already exists." });
    }

    const saveData = await newOrder.save();
    res.status(200).json({ message: "Product Created Successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orderData = await Order.find();
    if (!orderData || orderData.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const orderExist = await Order.findById(id);
    if (!orderExist) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json(orderExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderExist = await Order.findById(id);
    if (!orderExist) {
      return res.status(404).json({ message: "Order not found." });
    }

    const updatedData = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Product updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderExist = await Order.findById(id);
    if (!orderExist) {
      return res.status(404).json({ message: "Order not found." });
    }

    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
