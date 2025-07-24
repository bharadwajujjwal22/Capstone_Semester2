import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => (
  <div className="about-page white-bg">
    <div className="about-title-section">
      <h1>About Us</h1>
      <p>
        Welcome to <span className="highlight-red">Uvenza</span>, your trusted destination for quality products, seamless shopping, and exceptional service.
      </p>
    </div>
    <div className="about-mission-vision-row">
      <div className="about-card">
        <h2 className='about-card-title'>Our Mission</h2>
        <p>To empower shoppers by providing a diverse range of quality products, unbeatable value, and a convenient online shopping experience you can trust.</p>
      </div>
      <div className="about-card">
        <h2 className="about-card-title">Our Vision</h2>
        <p>To become a leading global e-commerce platform where customers discover, shop, and enjoy products from around the world with confidence and ease.</p>
      </div>
    </div>
    <div className="about-offer-section">
      <h2>What We Offer</h2>
      <ul>
        <li>Wide selection of products across multiple categories</li>
        <li>Easy-to-use website and secure checkout process</li>
        <li>Exclusive deals, discounts, and seasonal offers</li>
        <li>Fast and reliable shipping with order tracking</li>
        <li>Personalized dashboard for managing your orders and favorites</li>
      </ul>
    </div>
    <div className="about-journey-section">
      <h2>Join the Journey</h2>
      <p>Shop. Save. Smile. Experience the joy of effortless online shopping with Uvenza.</p>
      <Link to="/contact" className="contact-btn ">Contact Us</Link>
    </div>
  </div>
);

export default AboutPage; 