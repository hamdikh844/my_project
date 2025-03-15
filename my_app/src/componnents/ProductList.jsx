import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For View Details
import './product.css'; // Ensure you have a CSS file for custom styles

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Update Modal

  // Fetch pending products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch only pending products (accepted: false)
      const response = await axios.get('http://localhost:5000/product?accepted=false');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ type: 'danger', text: 'Failed to fetch products.' });
    } finally {
      setLoading(false);
    }
  };

  // Accept a product
  const handleAcceptProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/accept/${id}`);
      setMessage({ type: 'success', text: 'Product accepted successfully!' });
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error accepting product:', error);
      setMessage({ type: 'danger', text: 'Failed to accept product.' });
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      setMessage({ type: 'success', text: 'Product deleted successfully!' });
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ type: 'danger', text: 'Failed to delete product.' });
    }
  };

  // Update a product
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:5000/product/${updatedProduct._id}`, updatedProduct);
      setMessage({ type: 'success', text: 'Product updated successfully!' });
      setSelectedProduct(null); // Close the update modal
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage({ type: 'danger', text: 'Failed to update product.' });
    }
  };

  // Cancel update
  const handleCancelUpdate = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-dark bg-light text-center form-control">Pending Products</h1>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                  {product.images && product.images.length > 0 && (
                    <img
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt="Product"
                      className="img-fluid mb-3"
                      style={{ borderRadius: '8px' }}
                    />
                  )}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAcceptProduct(product._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Edit
                    </button>
                    <Link
                      to={`/product/${product._id}`} // Navigate to product details
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Product Modal */}
      {selectedProduct && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={handleCancelUpdate}></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateProduct(selectedProduct);
                  }}
                >
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedProduct.description}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;