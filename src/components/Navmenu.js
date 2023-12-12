import React from "react";

// Your React component
const NavMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a style={{ marginLeft: "10px" }} className="navbar-brand" href="/">
        React CRUD App
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/adduser">
              Add User
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Users
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
