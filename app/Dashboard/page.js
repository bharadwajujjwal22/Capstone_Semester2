'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="p-8">
      <img src="/assets/logo.png" className="w-20 mb-4" />
      <h1 className="text-2xl font-bold">Welcome, {user}</h1>
      <button
        onClick={() => router.push("/logout")}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
