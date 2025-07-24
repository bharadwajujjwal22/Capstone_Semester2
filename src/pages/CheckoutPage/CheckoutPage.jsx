import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Redirect to products page if cart is empty
    if (cartItems.length === 0) {
      navigate('/');
    }
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [cartItems.length, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode', 'cardName', 'cardNumber', 'expDate', 'cvv'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Card number validation (simple)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Expiration date validation (MM/YY format)
    if (formData.expDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = 'Please use MM/YY format';
    }
    
    // CVV validation
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate order processing
      setTimeout(() => {
        clearCart();
        navigate('/confirmation');
      }, 2000);
    }
  };
  
  const formatPrice = (price) => {
    return (price * 83).toFixed(2);
  };
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-container">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Contact Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
              
              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={errors.cardName ? 'error' : ''}
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength="19"
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expDate">Expiration Date</label>
                    <input
                      type="text"
                      id="expDate"
                      name="expDate"
                      placeholder="MM/YY"
                      value={formData.expDate}
                      onChange={handleChange}
                      maxLength="5"
                      className={errors.expDate ? 'error' : ''}
                    />
                    {errors.expDate && <span className="error-message">{errors.expDate}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="XXX"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength="4"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`place-order-button ${isProcessing ? 'processing' : ''}`}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <div className="order-summary-content">
              <h2>Order Summary</h2>
              
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-image">
                      <img src={item.image} alt={item.name} />
                      <span className="order-item-quantity">{item.quantity}</span>
                    </div>
                    <div className="order-item-details">
                      <h3>{item.name}</h3>
                      <p>₹{formatPrice(item.price)}</p>
                    </div>
                    <div className="order-item-total">
                      ₹{formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary-divider"></div>
              
              <div className="order-totals">
                <div className="order-total-row">
                  <span>Subtotal</span>
                  <span>₹{formatPrice(cartTotal)}</span>
                </div>
                <div className="order-total-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="order-total-row">
                  <span>Taxes</span>
                  <span>₹{formatPrice(cartTotal * 0.08)}</span>
                </div>
                <div className="order-total-row grand-total">
                  <span>Total</span>
                  <span>₹{formatPrice(cartTotal + (cartTotal * 0.08))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;