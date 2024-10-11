import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="auth-navbar">
      <Link to="/" className="navbar-logo">
        Budget Tracker
      </Link>
      <div className={`auth-nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          <p>Dashboard</p>
        </Link>
        <Link to="/transactions" onClick={toggleMenu}>
          <p>Transaction</p>
        </Link>
      </div>
      <div className="navbar-auth">
        {user ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          <Link to="/auth" className="dash-login">
            Login
          </Link>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
      </div>

      
    </nav>
  );
};

export default Navbar;
