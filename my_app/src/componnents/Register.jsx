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

    
    if (Password !== ConfirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

   
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
    <div className="container nb text-dark bg-light ll ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">Sign Up</h2>
          <form id="signupForm" onSubmit={handleSubmit}>
           
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control bg-light"
                id="username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

          
            <div className="mb-3">
              <label htmlFor="Date" className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control bg-light"
                id="birthday"
                value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control bg-light"
                id="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="CIN" className="form-label">CIN</label>
              <input
                type="number"
                className="form-control bg-light"
                id="CIN"
                value={Cin}
                onChange={(e) => setCin(e.target.value)}
                required
              />
            </div>

           
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control bg-light"
                id="phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

           
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control bg-light"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

       
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control bg-light"
                id="confirmPassword"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

           
            {ErrorMessage && <div className="alert alert-danger">{ErrorMessage}</div>}

          
            {Message && <div className="alert alert-success">{Message}</div>}

            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </div>
            </div>

            {/* Login link */}
            <div className="row text-primary text-center">
              <p className='text-dark'>Already have an account?</p> <Link className="nav-link btn bg-primary" to="/Singin">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
