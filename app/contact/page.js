'use client';
import { useState } from 'react';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(`Message sent`);

    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow p-10 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-bold mb-6">Contact Us</h1>

        {notification && (
          <div className="mb-4 p-3 bg-green-500 text-white rounded text-center">
            {notification}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded h-32"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
