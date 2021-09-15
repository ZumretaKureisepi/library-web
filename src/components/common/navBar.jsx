import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Library
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/publishers">
              Publishers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/books">
              Books
            </NavLink>
            <NavLink className="nav-item nav-link" to="/authors">
              Authors
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
