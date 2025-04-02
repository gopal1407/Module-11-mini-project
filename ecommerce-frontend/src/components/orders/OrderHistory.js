import React, { useEffect, useState } from "react";
import { api } from "../../api";

const OrderHistory = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await api.get("/customers/");
    setCustomers(res.data);
  };

  const fetchOrderHistory = async () => {
    try {
      const res = await api.get(`/orders/customer/${selectedCustomer}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Customer Order History</h3>

      <div className="mb-3">
        <label className="form-label">Select Customer</label>
        <select
          className="form-select"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">-- Choose Customer --</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>
              {cust.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-info mb-3"
        onClick={fetchOrderHistory}
        disabled={!selectedCustomer}
      >
        Load Order History
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-3 mb-3 rounded">
            <h5>Order #{order.id}</h5>
            <p>Date: {order.orderDate}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} - Qty: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
