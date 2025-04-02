import React, { useEffect, useState } from "react";
import { api } from "../../api";

const OrderTotal = () => {
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

  const fetchOrdersWithPrices = async () => {
    try {
      const res = await api.get(`/orders/customer/${selectedCustomer}`);
      const ordersWithPrices = await Promise.all(
        res.data.map(async (order) => {
          let total = 0;

          for (let item of order.items) {
            const productRes = await api.get(`/products/${item.productId}`);
            total += productRes.data.price * item.quantity;
          }

          return { ...order, totalPrice: total.toFixed(2) };
        })
      );
      setOrders(ordersWithPrices);
    } catch (error) {
      console.error("Error fetching orders or prices:", error);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Order Total Price</h3>

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
        onClick={fetchOrdersWithPrices}
        disabled={!selectedCustomer}
      >
        Show Orders with Total Price
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-3 mb-3 rounded">
            <h5>Order #{order.id}</h5>
            <p>Date: {order.orderDate}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} - Qty: {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total: ₹ {order.totalPrice}</strong></p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderTotal;
