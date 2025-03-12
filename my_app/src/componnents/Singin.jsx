import React, { useState } from 'react';
import './sing-in.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Singin = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [Message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/login', { Email, Password })
      .then((response) => {
        console.log(response);
        setMessage('Login Successful!');
        setErrorMessage('');

        
        if (Email === 'hamdi@gmail.com' && Password === 'hamdi1*2=3') {
          
          navigate('/Signin/AdminPanel');
        } else {
          
          navigate("/Product");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        }
        setMessage('');
      });
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {ErrorMessage && <div className="alert alert-danger">{ErrorMessage}</div>}
          {Message && <div className="alert alert-success">{Message}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singin;
