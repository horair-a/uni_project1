import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUserPage = () => {
  const initialUserState = {
    name: "",
    email: "",
    department: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/"); // Navigate to the home or users list page after successful submission
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <header className="abu">
        <h1>Add User</h1>
      </header>
      <form onSubmit={submitForm}>
        <label>Name</label>
        <input
          className="search-box"
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={inputHandler}
        />
        <label>Email</label>
        <input
          className="search-box"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={inputHandler}
        />
        <label>Department</label>
        <input
          className="search-box"
          type="text"
          name="department"
          placeholder="Department"
          value={user.department}
          onChange={inputHandler}
        />
        <button type="submit" className="edit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
