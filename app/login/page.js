'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const userDetails = localStorage.getItem(email);
    
    if (!userDetails) {
      setError("User does not exist.");
      return;
    }

    const { password: storedPassword } = JSON.parse(userDetails);


    if (storedPassword === password) {
      setError("");

      localStorage.setItem("isLoggedIn", "true");

      router.push("/");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500">Create one here</a>
        </p>
      </div>
    </div>
  );
}
