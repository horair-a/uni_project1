import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    department: "",
  };

  const [user, setUser] = useState(initialUserState);
  const { id } = useParams(); // Get the user ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user details.");
      });
  }, [id]);

  // Handle form input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/user/${id}`,
        user
      );
      toast.success(response.data.message, { position: "top-right" });
      navigate("/manage-users"); // Redirect to users management page
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <header className="abu">
        <h1>Update User</h1>
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
        <button type="submit" className="edit-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
