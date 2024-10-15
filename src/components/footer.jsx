import React from 'react';
import '../Footer.css'; // Assuming you place the converted CSS into Footer.css

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-logo">
                <a href="#" className="footer-title">
                    <svg className="footer-logo-svg" viewBox="0 0 202 69" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.44.672s6.656..." fillRule="nonzero"></path>
                    </svg>
                </a>
                <p className="footer-description">Design, Code and Ship!</p>
                <div className="footer-socials">
                    <a href="#" className="footer-social-icon">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="footer-icon" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a href="#" className="footer-social-icon">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="footer-icon" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53..."></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div className="footer-links">
                <div className="footer-section">
                    <h2 className="footer-heading">Support</h2>
                    <nav className="footer-nav">
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </nav>
                </div>
                <div className="footer-section">
                    <h2 className="footer-heading">Support</h2>
                    <nav className="footer-nav">
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </nav>
                </div>
            
            </div>
        </div>
    </footer>

  );
};

export default Footer;
