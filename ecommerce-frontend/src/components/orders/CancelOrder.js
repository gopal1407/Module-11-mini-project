import React, { useEffect, useState } from "react";
import { api } from "../../api";

const CancelOrder = () => {
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

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/orders/customer/${selectedCustomer}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.patch(`/orders/${orderId}/cancel`);
      alert("Order cancelled!");
      fetchOrders(); // Refresh after cancellation
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order.");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Cancel Pending Orders</h3>

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
        className="btn btn-warning mb-3"
        onClick={fetchOrders}
        disabled={!selectedCustomer}
      >
        Load Orders
      </button>

      {orders.length === 0 ? (
        <p>No orders to show.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-3 mb-3 rounded">
            <h5>Order #{order.id}</h5>
            <p>Date: {order.orderDate}</p>
            <p>Status: <strong>{order.status}</strong></p>
            {order.status === "pending" && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CancelOrder;
