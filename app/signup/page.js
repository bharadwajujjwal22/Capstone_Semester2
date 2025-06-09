'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      setError("This email is already registered.");
      setSuccess("");
      return;
    }

    const userDetails = {
      name,
      phone,
      email,
      password,
    };

    localStorage.setItem(email, JSON.stringify(userDetails));

    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("Account created successfully! Please log in.");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Sign Up</button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login here</a>
        </p>
      </div>
    </div>
  );
}
