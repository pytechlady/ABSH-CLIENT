import React from "react";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";


const Nav = () => {

  return (
   
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-lg-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
      <img src={Logo} alt="Logo" className="img-responsive w-50" />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Blog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default Nav;
