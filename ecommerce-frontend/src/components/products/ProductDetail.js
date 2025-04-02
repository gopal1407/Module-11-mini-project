import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import ConfirmModal from "../common/ConfirmModal";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/products/${id}`, {
        name: product.name,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
      });
      alert("Product updated!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Update failed!");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted.");
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Delete failed!");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Product Details</h3>

      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          name="name"
          className="form-control"
          value={product.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price ($)</label>
        <input
          name="price"
          type="number"
          className="form-control"
          value={product.price}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          name="stock"
          type="number"
          className="form-control"
          value={product.stock}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleUpdate} className="btn btn-primary">
  Update Product
</button>

<button onClick={() => setShowConfirm(true)} className="btn btn-danger">
  Delete Product
</button>

      <div className="d-flex justify-content-between">
        <button onClick={handleUpdate} className="btn btn-primary">
          Update Product
        </button>
        <button onClick={() => setShowConfirm(true)} className="btn btn-danger">
          Delete Product
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this product?"
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default ProductDetail;
