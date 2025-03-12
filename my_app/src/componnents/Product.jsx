import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import "./product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', images: [] });
  const [message, setMessage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ type: 'danger', text: 'Failed to fetch products.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts([...products, response.data]);
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setNewProduct({ name: '', description: '', price: '', images: [] });
      setImageFiles([]);
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to add product.' });
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      setProducts(products.filter(product => product._id !== id));
      setMessage({ type: 'success', text: 'Product deleted successfully!' });
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ type: 'danger', text: 'Failed to delete product.' });
    }
  };

  // Handle updating a product
  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map(product =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setMessage({ type: 'success', text: 'Product updated successfully!' });
    setSelectedProduct(null);
  };

  // Cancel updating the product
  const handleCancelUpdate = () => {
    setSelectedProduct(null);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      alert('You can only upload up to 6 images.');
      return;
    }
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} is not a valid image type.`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });
    setImageFiles(validFiles);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-dark bg-light text-center form-control">Product Management</h1>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="row">
        {/* Left Column: Add Product Form */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Add Product</h3>
              <form onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label htmlFor="formProductName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formProductName"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formProductDescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formProductDescription"
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formProductPrice">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formProductPrice"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formProductImages">Images (up to 6)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="formProductImages"
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Product</button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Product List */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Products List</h3>
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <ul className="list-group">
                  {products.map((product) => (
                    <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{product.name}</strong> - {product.description} - ${product.price}
                        {product.images && product.images.length > 0 && (
                          <img
                            src={`http://localhost:5000/${product.images[0]}`} // Display only the first image
                            alt="Product"
                            style={{ width: '50px', height: '50px', margin: '5px', borderRadius: '8px' }}
                          />
                        )}
                      </div>
                      <div>
                        <Link className="btn btn-info ms-2" to={`/product/${product._id}`}>View Details</Link>
                        <button className="btn btn-danger" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        <button className="btn btn-info ms-2" onClick={() => setSelectedProduct(product)}>Edit</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
          onCancel={handleCancelUpdate}
        />
      )}
    </div>
  );
}

export default Product;