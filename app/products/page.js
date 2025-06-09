'use client';
import { useState } from 'react';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

const mockProducts = [
  { id: 1, name: 'Minimal Dress', price: 59.99, img: '/assets/dress1.jpg' },
  { id: 2, name: 'Gray T-shirt', price: 29.99, img: '/assets/shirt1.jpg' },
];

export default function ProductsPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...currentCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />


      <main className="flex-grow p-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {mockProducts.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 shadow hover:shadow-md">
            <img src={p.img} alt={p.name} className="w-full h-64 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">${p.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}
