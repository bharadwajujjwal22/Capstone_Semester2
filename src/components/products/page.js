'use client';
import React, { useEffect, useState } from 'react';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function ProductsPage() {
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
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Nav />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Shop Products</h1>
        {loading && <div className="text-center text-lg text-gray-500">Loading products...</div>}
        {error && <div className="text-center text-red-500 mb-6">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200">
              <img src={product.image} alt={product.title} className="h-40 object-contain mb-4" />
              <h2 className="font-semibold text-lg mb-2 text-center line-clamp-2">{product.title}</h2>
              <p className="text-blue-700 font-bold text-xl mb-2">${product.price}</p>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 font-semibold">View</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 