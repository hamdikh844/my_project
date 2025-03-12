import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Orders List</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Details</h5>
                  <p className="card-text">
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="card-text">
                    <strong>Phone Number:</strong> {order.phoneNumber}
                  </p>
                  <p className="card-text">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-primary me-2">View Details</button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;