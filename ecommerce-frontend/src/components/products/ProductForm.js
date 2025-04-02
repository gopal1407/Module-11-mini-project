import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: 0,
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers/", customer);
      await api.post("/products/", {
        name: product.name,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
      });
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to add product.");
    }
  };

  return (
   
   <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name: </label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price ($): </label>
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <input
  name="name"
  required
  className="form-control"
  placeholder="Product Name"
  value={product.name}
  onChange={handleChange}
/>

<input
  name="price"
  type="number"
  min="1"
  required
  className="form-control"
  placeholder="Price in ₹"
  value={product.price}
  onChange={handleChange}
/>

        <div>
          <label>Stock: </label>
          <input
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
