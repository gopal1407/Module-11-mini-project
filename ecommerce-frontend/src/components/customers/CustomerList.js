import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Customer List</h3>
        <Link to="/customers/new" className="btn btn-primary">
          Add New Customer
        </Link>
      </div>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone}</td>
                  <td>
                    <Link to={`/customers/${cust.id}`} className="btn btn-sm btn-outline-info">
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
