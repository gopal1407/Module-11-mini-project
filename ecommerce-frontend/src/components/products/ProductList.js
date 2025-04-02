import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

const LOW_STOCK_THRESHOLD = 5;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRestock = async (id, currentStock) => {
    const newStock = currentStock + 10; // Restock by 10 units
    try {
      await api.put(`/products/${id}`, { stock: newStock });
      alert("Product restocked!");
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Error restocking product:", error);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Product List</h3>
        <Link to="/products/new" className="btn btn-success">
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.stock}</td>
                  <td>
                    {prod.stock < LOW_STOCK_THRESHOLD ? (
                      <span className="badge bg-warning text-dark">
                        Low Stock
                      </span>
                    ) : (
                      <span className="badge bg-success">OK</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/products/${prod.id}`} className="btn btn-sm btn-outline-primary me-2">
                      View / Edit
                    </Link>
                    {prod.stock < LOW_STOCK_THRESHOLD && (
                      <button
                        onClick={() => handleRestock(prod.id, prod.stock)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Restock
                      </button>
                    )}
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

export default ProductList;
