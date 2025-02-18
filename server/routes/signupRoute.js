import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getAllUser,
  updateUser,
} from "../controller/signupController.js";
import signup from "../model/signup.js";

const route = express.Router();

// Route to create a new user
route.post("/signup", createUser);

// Route to get all users
route.put("/signup", getUsers);

// Route to get a user by ID
route.get("/signup", getAllUser);

// Route to delete a user by ID
route.delete("/signup/:id", deleteUser);

export default route;
