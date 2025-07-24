import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '' });
  const [reviewMsg, setReviewMsg] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Could not load product.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;
    setReviews([
      ...reviews,
      { name: reviewForm.name, comment: reviewForm.comment, date: new Date().toLocaleString() }
    ]);
    setReviewForm({ name: '', comment: '' });
    setReviewMsg('Thank you for your review!');
    setTimeout(() => setReviewMsg(''), 2000);
  };

  if (loading) return <div className="product-details-loading">Loading...</div>;
  if (error) return <div className="product-details-error">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <img src={product.image} alt={product.title} className="product-details-image" />
        <div className="product-details-info">
          <h1>{product.title}</h1>
          <p className="product-details-category">Category: {product.category}</p>
          <p className="product-details-description">{product.description}</p>
          <div className="product-details-price-rating">
            <span className="product-details-price">${product.price}</span>
            <span className="product-details-rating">Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</span>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <div className="product-reviews-section">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product!</p>
        ) : (
          <ul className="product-reviews-list">
            {reviews.map((r, idx) => (
              <li key={idx} className="product-review-item">
                <strong>{r.name}</strong> <span className="review-date">({r.date})</span>
                <div>{r.comment}</div>
              </li>
            ))}
          </ul>
        )}
        <form className="product-review-form" onSubmit={handleReviewSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={reviewForm.name}
            onChange={handleReviewChange}
            required
          />
          <textarea
            name="comment"
            placeholder="Your Review"
            value={reviewForm.comment}
            onChange={handleReviewChange}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
        {reviewMsg && <div className="review-msg">{reviewMsg}</div>}
      </div>
    </div>
  );
};

export default ProductDetailsPage; 