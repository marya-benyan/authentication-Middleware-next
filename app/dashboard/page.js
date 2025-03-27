// app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user profile from API
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          throw new Error(data.error || "Failed to fetch profile");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-144px)] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full text-center transform hover:scale-105 transition duration-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Welcome to Your Dashboard, {user.email}!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          You’ve successfully logged in. Explore your space!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">Profile</h2>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-pink-700">Settings</h2>
            <p className="text-gray-600">Customize your experience.</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-md hover:from-red-600 hover:to-red-700 transition duration-300 font-semibold shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}