import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartIcon from '../Icons/CartIcon';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Header.css';
import uvenzaLogo from '../../assets/uvenza-logo.png';

const Header = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="/" className="logo" onClick={e => { e.preventDefault(); window.location.href = '/'; window.location.reload(); }}>
          <img src={uvenzaLogo} alt="Uvenza Logo" style={{ height: 70, display: 'block', margin: '0 auto' }} />
        </a>
        
        <button 
          className={`mobile-menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/cart" className="cart-icon-container">
            <CartIcon />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
          {user ? (
            <button
              onClick={async () => { await signOut(auth); }}
              style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #007AFF', background: 'white', color: '#007AFF', cursor: 'pointer' }}
            >
              Logout ({user.email.split('@')[0]})
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #007AFF', background: 'white', color: '#007AFF', cursor: 'pointer' }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;