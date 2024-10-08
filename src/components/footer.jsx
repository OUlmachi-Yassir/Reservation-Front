import React from 'react';
import '../Footer.css'; // Assuming you place the converted CSS into Footer.css

const Footer = () => {
  return (
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <a href="#" class="footer-title">
                    <svg class="footer-logo-svg" viewBox="0 0 202 69" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.44.672s6.656..." fill-rule="nonzero"></path>
                    </svg>
                </a>
                <p class="footer-description">Design, Code and Ship!</p>
                <div class="footer-socials">
                    <a href="#" class="footer-social-icon">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="footer-icon" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a href="#" class="footer-social-icon">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="footer-icon" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53..."></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="footer-links">
                <div class="footer-section">
                    <h2 class="footer-heading">Support</h2>
                    <nav class="footer-nav">
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </nav>
                </div>
                <div class="footer-section">
                    <h2 class="footer-heading">Support</h2>
                    <nav class="footer-nav">
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
