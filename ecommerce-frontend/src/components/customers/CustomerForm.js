import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const [product, setProduct] = useState({ name: "", price: 0, stock: 0 });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/", product);
      alert("Customer created successfully!");
      navigate("/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      setErrorMessage("Failed to create customer. Please try again.");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Add New Customer</h3>
      {/* ✅ Show Bootstrap error alert */}
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrorMessage("")}
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter full name"
          />
        </div>
        <input
  name="name"
  required
  className="form-control"
  placeholder="Full Name"
  value={customer.name}
  onChange={handleChange}
/>

<input
  name="email"
  type="email"
  required
  className="form-control"
  placeholder="example@email.com"
  value={customer.email}
  onChange={handleChange}
/>

<input
  name="phone"
  required
  className="form-control"
  placeholder="123-456-7890"
  value={customer.phone}
  onChange={handleChange}
/>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
