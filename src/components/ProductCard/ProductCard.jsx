import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';

const ProductCard = ({ product, onRequireLogin }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please log in to add to cart');
      return;
    }
    setIsAdding(true);
    addToCart(product);
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  
  const formatPrice = (price) => {
    return (price * 83).toFixed(2);
  };
  
  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image" 
            loading="lazy"
          />
          {typeof product.stock === 'number' && product.stock < 5 && (
            <span className="low-stock-badge">
              Only {product.stock} left!
            </span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.title}</h3>
          <div className="product-rating">
            <div className="stars" style={{ '--rating': product.rating?.rate || 0 }}></div>
            <span className="rating-value">{(product.rating?.rate || 0).toFixed(1)}</span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-price-container">
            <span className="product-price">₹{formatPrice(product.price)}</span>
            <button 
              className={`add-to-cart-button ${isAdding ? 'adding' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdding || !user}
              title={!user ? 'Please log in to add to cart' : ''}
            >
              {isAdding ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;