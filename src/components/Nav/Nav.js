import React from "react";
import { Link } from "react-router-dom";
import "components/Nav/Nav.css";

const Navigation = (props, context) => (
  <div className="navigation">
    <div className="inner">
      <Link to="/">Shopping Mall</Link>
      <Link to="/cart">Cart</Link>
    </div>
  </div>
);

export default Navigation;