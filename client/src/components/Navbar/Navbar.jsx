import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { IoMdArrowDropdown } from "react-icons/io";

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
      <div className="hamburger" onClick={toggleMenu}>
        <IoMdArrowDropdown />
      </div>
      <div className="navbar-auth">
        {user ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          <SignedOut>
            <SignInButton mode="modal" style={{all: 'unset', cursor: 'pointer'}} />
          </SignedOut>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
