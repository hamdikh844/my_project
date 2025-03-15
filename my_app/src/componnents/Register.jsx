import React, { useState } from 'react';
import "./registre.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [Username, setUsername] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Cin, setCin] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [Message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (Password !== ConfirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Submit form data
    axios.post('http://localhost:5000/Registre', { Username, Email, Password, Phone, Cin, Birthday })
      .then(result => {
        console.log(result);
        setMessage('Registration Successful!');
        setErrorMessage('');
        navigate("/Product");  
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);  // Display the error message from server
        }
        setMessage('');
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4 text-primary">Sign Up</h2>
        <form id="signupForm" onSubmit={handleSubmit}>
          {/* Username and Date of Birth in one row */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="birthday" className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email and CIN in one row */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="CIN" className="form-label">CIN</label>
              <input
                type="number"
                className="form-control"
                id="CIN"
                value={Cin}
                onChange={(e) => setCin(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Password and Confirm Password in one row */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {ErrorMessage && <div className="alert alert-danger">{ErrorMessage}</div>}

          {/* Success Message */}
          {Message && <div className="alert alert-success">{Message}</div>}

          {/* Register Button */}
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted">Already have an account? <Link to="/Singin" className="text-primary">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;