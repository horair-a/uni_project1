import Approval from "../model/approval.js";
import Orders from "../model/productModel.js"

export const createApprovalRequest = async (req, res) => {
  try {
    const newApproval = new Approval(req.body);
    const { username, productName } = newApproval;

    const approvalExist = await Approval.findOne({ username, productName, approvalStatus: "Pending" });
    if (approvalExist) {
      return res.status(400).json({ message: "Approval request already exists and is pending." });
    }

    const saveData = await newApproval.save();
    res.status(200).json({ message: "Approval request created successfully.", data: saveData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllApprovalRequests = async (req, res) => {
  try {
    const approvalData = await Approval.find();
    if (!approvalData || approvalData.length === 0) {
      return res.status(404).json({ message: "No approval requests found." });
    }
    res.status(200).json(approvalData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateApprovalType = async (req, res) => {
  try {
    const { username, productName, quantity, approvalType } = req.body;

    // Validate input data
    if (!username || !productName || !quantity || !approvalType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const approvalRequest = await Approval.findOneAndUpdate(
      { username, productName, quantity },
      { approvalStatus: approvalType },
      { new: true } // Returns the updated document
    );

    if (!approvalRequest) {
      return res.status(404).json({ message: "Approval request not found." });
    }

    if (approvalType === "Approved") {
      const product = await Orders.findOne({ productName });

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      if (product.quantity < quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient product quantity in stock." });
      }

      // Update product quantity
      product.quantity =product.quantity - quantity;
      await product.save();
    }

    res.status(200).json({
      message: "Approval type updated successfully.",
      data: approvalRequest,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

  
export const updateApprovalRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const approvalExist = await Approval.findById(id);
    if (!approvalExist) {
      return res.status(404).json({ message: "Approval request not found." });
    }

    const updatedData = await Approval.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Approval request updated successfully.", updatedData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteApprovalRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const approvalExist = await Approval.findById(id);
    if (!approvalExist) {
      return res.status(404).json({ message: "Approval request not found." });
    }

    await Approval.findByIdAndDelete(id);
    res.status(200).json({ message: "Approval request deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const getUserApprovalRequests = async (req, res) => {
  try {
    const { username } = req.query; // Fetch username from query params
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    const userApprovals = await Approval.find({ username });
    
    if (!userApprovals || userApprovals.length === 0) {
      return res.status(404).json({ message: "No approval requests found for this user." });
    }

    res.status(200).json(userApprovals);
  } catch (error) {
    console.error("Error fetching user approval requests:", error);
    res.status(500).json({ message: "Failed to fetch user approvals.", error: error.message });
  }
};
