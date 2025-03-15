import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-tree-fill text-success fs-3 me-2"></i> {/* Tree icon */}
          <span className="fs-4 fw-bold text-dark">Eco Agri</span>
          <span className="fs-4 fw-light text-muted ms-1">Market Palace</span>
        </Link>
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
              <Link className="nav-link text-light bg-success bn" to="/Register">Add product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light bg-success bn" to="/Service">Service</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}