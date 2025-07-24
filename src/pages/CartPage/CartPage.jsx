import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Enable checkout button if cart has items
    setIsCheckoutDisabled(cartItems.length === 0);
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [cartItems]);
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const formatPrice = (price) => {
    return (price * 83).toFixed(2);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 16H56L51.2 40H20.8L16 16Z" stroke="#999" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="24" cy="52" r="4" fill="#999"/>
              <circle cx="48" cy="52" r="4" fill="#999"/>
              <path d="M8 8H12L16 16" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="start-shopping-button">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <button 
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{formatPrice(cartTotal)}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-item">
              <span>Taxes</span>
              <span>₹{formatPrice(cartTotal * 0.08)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-item total">
              <span>Total</span>
              <span>₹{formatPrice(cartTotal + (cartTotal * 0.08))}</span>
            </div>
            
            <div className="promo-code">
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="promo-input"
              />
              <button className="apply-promo-button">Apply</button>
            </div>
            
            <button 
              className="checkout-button"
              onClick={handleCheckout}
              disabled={isCheckoutDisabled}
            >
              Proceed to Checkout
            </button>
            
            <div className="continue-shopping">
              <Link to="/">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;