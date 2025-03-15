import React from 'react'
import { Link } from 'react-router-dom';
import "./fo.css";

const Foote = () => {
  return (
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4">
          <h4>About Us</h4>
          <p>
            Chez ECO-AGRI, nous nous engageons à promouvoir une agriculture respectueuse de l'environnement et durable.
            Rejoignez-nous pour soutenir une agriculture responsable.
          </p>
        </div>

        <div className="col-12 col-md-4">
          
          <li className="nav-item list-unstyled">
              <Link className="nav-link bg-success" to="/about">ABOUT</Link> 
            </li>
            <br>
            </br>
          
        </div>

       
      </div>

      <div className="row">
        <div className="col-12">
          <p className="footer-bottom-text">
            &copy; {new Date().getFullYear()} ECO-AGRI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Foote
