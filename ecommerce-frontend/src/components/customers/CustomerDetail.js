import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import ConfirmModal from "../common/ConfirmModal";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/customers/${id}`, customer);
      alert("Customer updated!");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Update failed!");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/customers/${id}`);
      alert("Customer deleted.");
      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Delete failed!");
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Customer Details</h3>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          value={customer.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={customer.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          name="phone"
          className="form-control"
          value={customer.phone}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-between">
        <button onClick={handleUpdate} className="btn btn-primary">
          Update Customer
        </button>
        <button onClick={() => setShowConfirm(true)} className="btn btn-danger">
          Delete Customer
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this customer?"
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default CustomerDetail;
