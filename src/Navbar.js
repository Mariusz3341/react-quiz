import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
          <Link to="/">Home page</Link> <br />
          <Link to="/questions">Lista pytań</Link> <br />
          <Link to="/addQuestion">Dodaj pytanie</Link> <br /><br />
    </div>
  );
}

export default Navbar;