import React, { useState } from 'react';
import './sing-in.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Singin = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [Message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(''); // Clear previous error messages
    setMessage(''); // Clear previous success messages

    try {
      const response = await axios.post('http://localhost:5000/login', {
        Email: Email.trim(), // Trim email
        Password: Password.trim(), // Trim password
      });

      console.log('Login Response:', response.data);
      setMessage('Login Successful!');

      // Redirect based on user role (handled by backend)
      if (response.data.role === 'admin') {
        navigate('/Signin/AdminPanel');
      } else {
        navigate('/Product');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred during login.');
      } else {
        setErrorMessage('An error occurred during login.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center msin">
      <div className="card p-3 shadow-lg">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <input
                type="email"
                id="email"
                className="form-control w-100"
                placeholder="Enter your email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(''); // Clear error message when typing
                }}
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(''); // Clear error message when typing
                }}
                required
              />
            </div>
          </div>

          {ErrorMessage && <div className="alert alert-danger">{ErrorMessage}</div>}
          {Message && <div className="alert alert-success">{Message}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={Loading}>
            {Loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singin;