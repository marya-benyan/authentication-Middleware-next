"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
      router.push("/dashboard");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-144px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full transform transition-all hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-semibold shadow-md"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-600 font-semibold transition duration-200">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}