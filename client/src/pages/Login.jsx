import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Login successful:", data.message);

        // Store user info if needed
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect to home
        window.location.href = "/";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" disabled={loading} /> Remember me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button
                type="button"
                className="social-btn google"
                disabled={loading}
              >
                Google
              </button>
              <button
                type="button"
                className="social-btn github"
                disabled={loading}
              >
                GitHub
              </button>
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
