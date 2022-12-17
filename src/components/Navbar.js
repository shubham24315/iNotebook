import React from 'react'
import { useEffect } from 'react';

import {

    Link, useLocation
  } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");            
  }
  let location=useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">iNotebook</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
     {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      </form>:<button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
  )
}
