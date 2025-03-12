import React, { useState } from 'react';
import axios from 'axios';
import "./command.css"

const Command = () => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = { address, phoneNumber, paymentMethod };

    try {
      const response = await axios.post('http://localhost:5000/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        
        alert('Order placed successfully!');
        
        
        setAddress('');
        setPhoneNumber('');
        setPaymentMethod('');
        
        
        e.target.reset(); 

        console.log(response.data);
      }
    } catch (err) {
      alert('Failed to place order');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 cmd">
      <h1 className="mb-4 text-center">Order Information</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg">
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            id="phone"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method">Payment Method:</label>
          <select
            id="payment-method"
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Submit Order</button>
      </form>
    </div>
  );
};

export default Command;
