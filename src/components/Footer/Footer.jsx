import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Uvenza</h3>
            <p className="footer-description">
              Discover amazing products with an effortless shopping experience.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="social-icon">f</i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="social-icon">t</i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="social-icon">i</i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Shop</h3>
            <ul className="footer-links">
              <li><Link to="/">All Products</Link></li>
              <li><Link to="/">New Arrivals</Link></li>
              <li><Link to="/">Best Sellers</Link></li>
              <li><Link to="/">Deals & Offers</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Shipping Info</Link></li>
              <li><Link to="/">Returns</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="footer-description">
              Subscribe to receive updates and special offers.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input" 
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Uvenza. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;