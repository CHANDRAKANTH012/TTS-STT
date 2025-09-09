import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="main-div-login">

      <div className="login-card">
        {/* Left Side Branding */}
        <div className="login-left">
          <h1>VoiceFlow</h1>
          <p>
            Seamless <span>Text-to-Speech</span> and <span>Speech-to-Text</span>
            <br /> with AI powered clarity ✨
          </p>
          <div className="glow-circle"></div>
        </div>

        {/* Right Side Form */}
        <div className="login-right">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to continue your journey</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button className="social-btn google">Google</button>
              <button className="social-btn github">GitHub</button>
            </div>

            <p className="signup-text">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
