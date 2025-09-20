import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Registration successful:", data.message);

        // Store user info if needed
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect to home or login page
        window.location.href = "/";
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-div-register">
      <div className="register-card">
        {/* Left Side Branding */}
        <div className="register-left">
          <h1>VoiceFlow</h1>
          <p>
            Seamless <span>Text-to-Speech</span> and <span>Speech-to-Text</span>
            <br /> with AI powered clarity ✨
          </p>
          <div className="glow-circle"></div>
        </div>

        {/* Right Side Form */}
        <div className="register-right">
          <h2>Create Account 👋</h2>
          <p className="subtitle">Join the voice revolution today</p>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "5px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" required disabled={loading} /> I agree to
                the T&C and Privacy Policy
              </label>
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
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

            <p className="signin-text">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
