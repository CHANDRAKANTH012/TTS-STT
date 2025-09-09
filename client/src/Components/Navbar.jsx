import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="left">
          <div className="logo-container">
            <img src="./logo.png" alt="logo" className="logo" />
            <span className="logo-text">VoiceFlow</span>
          </div>
          <ul
            className={`nav-items ${
              isMobileMenuOpen ? "nav-items-mobile-open" : ""
            }`}
          >
            <li className="nav-item">
              <Link to={"/tts"}>Text to Speech</Link>
            </li>
            <li className="nav-item">
              <Link to={"/stt"}>Speech to Text</Link>
            </li>
            <li className="nav-item">
              <Link to={"/history"}>History</Link>
            </li>
          </ul>
        </div>

        <div className="right">
          {isLoggedIn ? (
            <div className="auth-container logged-in">
              <span className="user-greeting">Hi there! 👋</span>
              <button className="btn btn-outline" onClick={toggleAuth}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-container logged-out">
              <button className="btn btn-outline" onClick={()=>navigate('/login')}>
                Login
              </button>
              <button className="btn btn-primary" onClick={toggleAuth}>
                Sign Up
              </button>
            </div>
          )}
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span
            className={`hamburger ${isMobileMenuOpen ? "hamburger-open" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
