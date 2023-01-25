import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="container mt-3 mb-5">
      {/* <Link to="/">Home page</Link> <br />
      <Link to="/questions">Lista pytań</Link> <br />
      <Link to="/addQuestion">Dodaj pytanie</Link> <br />
      <br /> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home page
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/questions">
              Lista pytań
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addQuestion">
              Dodaj pytanie
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
