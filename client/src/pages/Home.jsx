import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="floating-elements">
            <div className="floating-circle"></div>
            <div className="floating-circle"></div>
            <div className="floating-circle"></div>
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">VoiceFlow</h1>
            <p className="hero-subtitle">
              Transform your voice with cutting-edge AI technology. Experience seamless text-to-speech and speech-to-text conversion with crystal-clear quality and lightning-fast processing.
            </p>
            
            <div className="cta-buttons">
              <Link to="/tts" className="btn-primary">
                Try Text-to-Speech
              </Link>
              <Link to="/stt" className="btn-secondary">
                Try Speech-to-Text
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <h2 className="features-title">Why Choose VoiceFlow?</h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎤</div>
                <h3 className="feature-title">Advanced Speech Recognition</h3>
                <p className="feature-description">
                  State-of-the-art AI algorithms that accurately convert your speech to text with industry-leading precision and speed.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔊</div>
                <h3 className="feature-title">Natural Voice Synthesis</h3>
                <p className="feature-description">
                  Generate human-like speech from text with multiple voice options, perfect for accessibility and content creation.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Lightning Fast Processing</h3>
                <p className="feature-description">
                  Real-time processing capabilities ensure instant results without compromising on quality or accuracy.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3 className="feature-title">Privacy & Security</h3>
                <p className="feature-description">
                  Your data is processed securely with enterprise-grade encryption and privacy protection standards.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3 className="feature-title">Multi-Language Support</h3>
                <p className="feature-description">
                  Support for multiple languages and accents, making it accessible to users worldwide.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Cross-Platform Compatible</h3>
                <p className="feature-description">
                  Works seamlessly across all devices and platforms - desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <h2 className="features-title">Trusted by Thousands</h2>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Conversions</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Accuracy Rate</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Availability</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;