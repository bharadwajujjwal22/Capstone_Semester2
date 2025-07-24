import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Generate random order number
  const orderNumber = Math.floor(100000000 + Math.random() * 900000000);
  
  // Get current date
  const today = new Date();
  const orderDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Estimated delivery date (7 days from now)
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 7);
  const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  useEffect(() => {
    // If no order was placed, redirect to home
    if (cartItems.length > 0) {
      navigate('/');
    }
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [cartItems.length, navigate]);
  
  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="confirmation-icon">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" 
                stroke="#34C759" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M22 4L12 14.01L9 11.01" 
                stroke="#34C759" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Thank you for your order!</h1>
          <p className="confirmation-message">
            Your order has been received and is being processed. You will receive an email confirmation shortly.
          </p>
        </div>
        
        <div className="order-info">
          <div className="order-info-item">
            <span className="info-label">Order Number</span>
            <span className="info-value">{orderNumber}</span>
          </div>
          <div className="order-info-item">
            <span className="info-label">Order Date</span>
            <span className="info-value">{orderDate}</span>
          </div>
          <div className="order-info-item">
            <span className="info-label">Estimated Delivery</span>
            <span className="info-value">{estimatedDelivery}</span>
          </div>
        </div>
        
        <div className="next-steps">
          <h2>What's Next?</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <span>1</span>
              </div>
              <div className="step-content">
                <h3>Order Processing</h3>
                <p>We're preparing your items for shipping. You'll receive an email when your order ships.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <span>2</span>
              </div>
              <div className="step-content">
                <h3>Shipping</h3>
                <p>Your items will be carefully packaged and handed to our shipping partners.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <span>3</span>
              </div>
              <div className="step-content">
                <h3>Delivery</h3>
                <p>Your package will arrive at your doorstep. Enjoy your new products!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;