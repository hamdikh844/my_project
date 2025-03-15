import React, { useState } from 'react';
import axios from 'axios';
import './product.css'; // Ensure you have a CSS file for custom styles

function Product() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
  });
  const [message, setMessage] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    imageFiles.forEach((file) => {
      formData.append('images', file); // Append each image file
    });

    try {
      await axios.post('http://localhost:5000/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'Product added successfully!' });
      setNewProduct({ name: '', description: '', price: '', images: [] }); // Reset form
      setImageFiles([]); // Clear image files
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to add product.' });
    }
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
      <h1 className="my-4 text-dark bg-light text-center form-control">Add Product</h1>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Add Product Form</h3>
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
      </div>
    </div>
  );
}

export default Product;