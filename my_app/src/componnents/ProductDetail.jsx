import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './productDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [rating, setRating] = useState(0); // State to store the product rating

  // Fetch product details when the component mounts or the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data); // Set product data
        setRating(response.data.rating || 0); // Set product rating (default to 0 if not provided)
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, [id]);

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    alert(`Added ${product.name} to the cart!`);
  };

  // Handle "Buy Now" button click
  const handleBuyNow = () => {
    alert(`Purchased ${product.name} for $${product.price}!`);
  };

  // Handle star rating click
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    // You can also send the rating to the backend here if needed
  };

  // Display loading state
  if (loading) {
    return <div className="text-center my-4">Loading product details...</div>;
  }

  // Display error state
  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Products
        </button>
      </div>
    );
  }

  // Display "Product not found" state
  if (!product) {
    return (
      <div className="container my-4">
        <div className="alert alert-warning" role="alert">
          Product not found.
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Products
        </button>
      </div>
    );
  }

  // Display product details
  return (
    <div className="container my-4 product-detail">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          <div className="product-images">
            <img
              src={`http://localhost:5000/${product.images[0]}`} // Display the first image
              alt="Product"
              className="img-fluid main-image"
            />
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${image}`}
                  alt={`Product ${index}`}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 product-info">
          <h1 className="mb-3">{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <p className="h4">
            <strong>Price:</strong> ${product.price}
          </p>

          {/* Star Rating */}
          <div className="star-rating mb-3">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
                onClick={() => handleStarClick(index + 1)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Buttons */}
          <button className="btn btn-primary me-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-success me-2" onClick={()=> navigate('../Command')}>
            Buy Now
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;