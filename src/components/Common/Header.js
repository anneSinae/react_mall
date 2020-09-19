import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from 'components/Auth/LogoutButton';

const header = (props, context) => (

  <header className="navigation">
    <h1><Link to="/" className="logo">Anne's Mall</Link></h1>
    <div className="top-mn">
      {props.authenticated ? (
          <LogoutButton logout={props.logout} />
        ) : (<Link to="/login">Login</Link>
      )}
     <Link to="/join">Join</Link>
      <Link to="/mypage">Mypage</Link>
      <Link to="/cs">Customer</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/wish">Wish List</Link>
    </div>
    <div className="inner">
      <Link to="/">Outer</Link>
      <Link to="/">Blouse</Link>
      <Link to="/">Tee/Knit</Link>
      <Link to="/">Dress</Link>
      <Link to="/">Skirt</Link>
      <Link to="/">Pants</Link>
    </div>
    <div className="search"><input type="text" /><button>검색</button></div>
  </header>
);

export default header;