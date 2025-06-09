'use client';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="mb-4 flex justify-between items-center border-b pb-2">
              <span>{item.name}</span>
              <div>
                ${item.price.toFixed(2)}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 font-semibold">
            Total: ${total}
          </div>
        </>
      )}
    </div>
  );
}
