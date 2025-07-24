import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage
  const loadCartFromStorage = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        updateCartSummary(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  }, []);

  // Save cart to localStorage
  const saveCartToStorage = useCallback((items) => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }, []);

  // Calculate cart totals
  const updateCartSummary = useCallback((items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setCartCount(count);
    setCartTotal(price);
  }, []);

  // Add item to cart
  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
      } else {
        // Add new item
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      updateCartSummary(updatedItems);
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveCartToStorage, updateCartSummary]);

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      updateCartSummary(updatedItems);
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveCartToStorage, updateCartSummary]);

  // Update item quantity
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      updateCartSummary(updatedItems);
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveCartToStorage, updateCartSummary]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCount(0);
    setCartTotal(0);
    saveCartToStorage([]);
  }, [saveCartToStorage]);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCartFromStorage
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};