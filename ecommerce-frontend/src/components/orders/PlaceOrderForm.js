import React, { useEffect, useState } from "react";
import { api } from "../../api";

const PlaceOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    const res = await api.get("/customers/");
    setCustomers(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products/");
    setProducts(res.data);
  };

  const handleProductSelect = (productId) => {
    const existing = orderItems.find((item) => item.productId === productId);
    if (!existing) {
      setOrderItems([...orderItems, { productId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      customerId: selectedCustomer,
      orderDate: new Date().toISOString().split("T")[0],
      items: orderItems,
    };

    try {
      await api.post("/orders/", order);
      alert("Order placed successfully!");
      setOrderItems([]);
      setSelectedCustomer("");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Place New Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Customer</label>
          <select
            className="form-select"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name} ({cust.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Products</label>
          <div className="d-flex flex-wrap gap-2">
            {products.map((prod) => (
              <button
                key={prod.id}
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleProductSelect(prod.id)}
              >
                {prod.name}
              </button>
            ))}
          </div>
        </div>

        {orderItems.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Selected Products</label>
            {orderItems.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return (
                <div key={item.productId} className="input-group mb-2">
                  <span className="input-group-text">{product.name}</span>
                  <input
  type="number"
  min="1"              
  required             
  className="form-control"
  value={item.quantity}
  onChange={(e) =>
    handleQuantityChange(item.productId, e.target.value)
  }
/>

                </div>
              );
            })}
          </div>
        )}
<select
  onChange={(e) => setSelectedCustomer(e.target.value)}
>
  ...
</select>

<input
  type="number"
  onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
/>

<select
  className="form-select"
  required
  value={selectedCustomer}
  onChange={(e) => setSelectedCustomer(e.target.value)}
>
  <option value="">-- Choose Customer --</option>
  ...
</select>

        <button type="submit" className="btn btn-primary mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrderForm;
