import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        {submitted ? (
          <div className="contact-thankyou">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Phone Number
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <button type="submit" className="contact-btn">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage; 