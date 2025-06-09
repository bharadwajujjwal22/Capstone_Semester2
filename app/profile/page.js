'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../Components/footer';
import Nav from '../Components/nav';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!isLoggedIn || !loggedInUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    setShowLogoutModal(false);
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Nav />

      <main className="flex-grow px-6 md:px-16 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">My Profile</h1>

          {user ? (
            <>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-lg text-gray-600 mb-10">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
            </>
          ) : (
            <p>Loading user info...</p>
          )}


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <button className="bg-black hover:bg-gray-600 text-white font-semibold py-4 rounded-lg shadow transition w-full">
              Account Settings
            </button>
            <button className="bg-black hover:bg-gray-600 text-white font-semibold py-4 rounded-lg shadow transition w-full">
              Order History
            </button>
            <button className="bg-black hover:bg-gray-600 text-white font-semibold py-4 rounded-lg shadow transition w-full">
              Payment Methods
            </button>
          </div>


          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            <img></img>
          </div>

          <div className="mt-10 flex justify-center  w-full pb-12">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold shadow transition"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      


      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
