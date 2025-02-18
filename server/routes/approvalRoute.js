import express from "express";
import {
  createApprovalRequest,
  getAllApprovalRequests,
  getUserApprovalRequests,
  updateApprovalType,
  deleteApprovalRequest,
} from "../controller/approvalController.js";

const route = express.Router();

route.post("/approval", createApprovalRequest); // Create approval request
route.get("/approvals", getAllApprovalRequests); // Get all approvals
route.get("/userApprovals", getUserApprovalRequests); // Get user-specific approvals
route.put("/updateApproval", updateApprovalType); // Update approval request
route.delete("/delete/approval/:id", deleteApprovalRequest); // Delete approval request

export default route;
