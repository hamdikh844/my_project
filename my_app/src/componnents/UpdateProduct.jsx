import React, { useState } from 'react';
import axios from 'axios';

function UpdateProduct({ product, onUpdate, onCancel }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price);

    // Add new images if any
    Array.from(imageFiles).forEach((file) => {
      formData.append('images', file);
    });

    // Send the PUT request with formData
    axios
      .put(`http://localhost:5000/product/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="mb-4">
      <h3>Update Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="formProductName">Name</label>
          <input
            type="text"
            className="form-control"
            id="formProductName"
            name="name"
            placeholder="Product Name"
            value={updatedProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formProductDescription">Description</label>
          <input
            type="text"
            className="form-control"
            id="formProductDescription"
            name="description"
            placeholder="Product Description"
            value={updatedProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formProductPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="formProductPrice"
            name="price"
            placeholder="Product Price"
            value={updatedProduct.price}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Image upload input */}
        <div className="form-group">
          <label htmlFor="formProductImages">Images</label>
          <input
            type="file"
            className="form-control"
            id="formProductImages"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Product</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateProduct;




