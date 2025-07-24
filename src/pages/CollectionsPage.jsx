import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';

const CollectionsPage = ({ onRequireLogin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Could not load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Collections</h1>
          <p>Browse our curated product collections</p>
        </div>
      </div>
      <div className="products-container">
        {loading && <div className="loading-products"><p>Loading products...</p></div>}
        {error && <div className="text-red-500 mb-6">{error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        )}
        <div className="products-list collections-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onRequireLogin={onRequireLogin} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage; 