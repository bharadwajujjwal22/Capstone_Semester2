import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    setIsRemoving(true);

    setTimeout(() => {
      removeFromCart(item.id);
    }, 300);
  };
  
  const formatPrice = (price) => {
    return (price * 83).toFixed(2);
  };
  
  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">₹{formatPrice(item.price)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn decrease"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button 
          className="quantity-btn increase"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>
      
      <div className="cart-item-total">
        <span>₹{formatPrice(item.price * item.quantity)}</span>
      </div>
      
      <button 
        className="cart-item-remove"
        onClick={handleRemove}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;