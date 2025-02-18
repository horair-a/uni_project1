import Signup from "../model/signup.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new Signup(req.body);
    const { email } = newUser;

    const userExist = await Signup.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    await newUser.save();
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUsers = async (req, res) => {
    try {
      const { email, password } = req.body;  // Extract email and password from request body
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      // Find user by email and password
      const user = await Signup.findOne({ email, password });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Return the found user
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  

export const getAllUser = async (req, res) => {
  try {
    const user = await Signup.find();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Signup.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await Signup.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Signup.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await Signup.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
