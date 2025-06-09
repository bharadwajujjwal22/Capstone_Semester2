'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";





export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setShowLogoutModal(false); 
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleHideLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="flex justify-between items-center px-8 bg-white shadow">
      <div className="flex space-x-6 text-m font-medium">
        <Link href="/about" className="font-semibold">About</Link>
        <Link href="/contact" className="font-semibold">Contact</Link>
        <Link href="/products" className="font-semibold">Buy</Link>
      </div>


      <a href="/" className="py-2 cursor-pointer inline-block">
  <img src="/assets/Uvenza.png" alt="Logo" className="w-30 h-15" />
</a>


      <div className="flex text-m space-x-7 items-center font-medium cursor-pointer">
  <Link href="/search">
    <img className="w-5 h-auto" src="/assets/searchicon.png" alt="Search" />
  </Link>

  {isLoggedIn && (
    <>
      <Link href="/cart">
        <img className="w-8 h-auto" src="/assets/shoppingCart.png" alt="Cart" />
      </Link>
      <Link href="/profile">
        <img className="w-5 h-auto" src="/assets/user.png" alt="User" />
      </Link>
    </>
  )}

  {!isLoggedIn && (
    <Link href="/login" className="font-semibold">
      Login
    </Link>
  )}
</div>


      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Yes, Log Out
              </button>
              <button
                onClick={handleHideLogoutModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
