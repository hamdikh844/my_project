import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand in text-dark" to="/">ECO_AGRI</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse nn" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <Link className="nav-link active text-light" to="/" aria-current="page">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">ABOUT</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">CONTACT</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link text-light bg-success bn" to="/Register">Add product</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link text-light bg-success bn" to="/Singin">Admin</Link>
            </li>
           
            
            

            
            
            
             
        
          </ul>
          
        
        </div>
      </div>
    </nav>
  );
}