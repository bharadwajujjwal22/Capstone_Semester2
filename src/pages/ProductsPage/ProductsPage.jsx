import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductsPage.css';

const ProductsPage = ({ onRequireLogin }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
  const [showAbout, setShowAbout] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setAllProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories([
          { id: 'all', name: 'All' },
          ...uniqueCategories.map(cat => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }))
        ]);
      } catch (err) {
        setError('Could not load products.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...allProducts];
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        result.sort((a, b) => a.id - b.id);
    }
    setFilteredProducts(result);
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="products-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>All Products</h1>
          <p>Browse our complete product collection</p>
        </div>
      </div>
      <div className="products-container">
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filters">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    className={selectedCategory === category.id ? 'active' : ''}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="sort-options">
            <h3>Sort By</h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        <div className="products-grid">
          <div className="products-header">
            <h2>
              {selectedCategory === 'all' 
                ? 'All Products' 
                : categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span className="product-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          {isLoading ? (
            <div className="loading-products">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 mb-6">{error}</div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-list">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onRequireLogin={onRequireLogin} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button 
                className="reset-button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSortBy('default');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      {showAbout && (
        <div className="about-modal">
          <div className="about-modal-content">
            <h2>About Uvenza</h2>
            <p>
              Uvenza is your one-stop shop for quality products at great prices. Browse, add to cart, and enjoy a seamless shopping experience!
            </p>
            <button onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;