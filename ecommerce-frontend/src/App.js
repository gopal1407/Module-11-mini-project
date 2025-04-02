import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CustomerForm from "./components/customers/CustomerForm";
import CustomerList from "./components/customers/CustomerList";
import CustomerDetail from "./components/customers/CustomerDetail";

import ProductForm from "./components/products/ProductForm";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";

import PlaceOrderForm from "./components/orders/PlaceOrderForm";
import OrderHistory from "./components/orders/OrderHistory";
import CancelOrder from "./components/orders/CancelOrder";
import OrderTotal from "./components/orders/OrderTotal";

function App() {
  return (
    <Router>
      <div className="container py-4">
        <h1 className="mb-4 text-center">🛒 E-Commerce Dashboard</h1>

        {/* Navigation */}
        <nav className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
          <Link to="/customers" className="btn btn-outline-primary">Customers</Link>
          <Link to="/products" className="btn btn-outline-secondary">Products</Link>
          <Link to="/orders/place" className="btn btn-outline-success">Place Order</Link>
          <Link to="/orders/history" className="btn btn-outline-info">Order History</Link>
          <Link to="/orders/cancel" className="btn btn-outline-warning">Cancel Orders</Link>
          <Link to="/orders/total" className="btn btn-outline-dark">Order Totals</Link>
          <Link to="/products" className="btn btn-outline-secondary">Products</Link>
          <Link to="/orders/place" className="btn btn-outline-success">Place Order</Link>
  ...
        </nav>

        {/* Page Routes */}
        <Routes>
          {/* Customer Routes */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />

          {/* Product Routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Order Routes */}
          <Route path="/orders/place" element={<PlaceOrderForm />} />
          <Route path="/orders/history" element={<OrderHistory />} />
          <Route path="/orders/cancel" element={<CancelOrder />} />
          <Route path="/orders/total" element={<OrderTotal />} />

          {/* Default route */}
          <Route path="/" element={<CustomerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
