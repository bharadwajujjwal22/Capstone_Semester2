import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import CollectionsPage from './pages/CollectionsPage';
import ContactPage from './pages/ContactPage';
import { useCart } from './context/CartContext';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { loadCartFromStorage } = useCart();
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  const setGlobalLoginMsg = () => {
    setShowLoginMsg(true);
    setTimeout(() => setShowLoginMsg(false), 2000);
  };
  
  useEffect(() => {
    // Simulate initial loading
    loadCartFromStorage();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [loadCartFromStorage]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      {showLoginMsg && (
        <div className="login-toast" style={{ marginTop: 12 }}>Please log in to add to cart</div>
      )}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductsPage onRequireLogin={setGlobalLoginMsg} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<OrderConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collections" element={<CollectionsPage onRequireLogin={setGlobalLoginMsg} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;