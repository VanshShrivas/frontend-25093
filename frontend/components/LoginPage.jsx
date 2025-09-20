// components/LoginPage.jsx
import React, { useState } from "react";

const allowedDomains = ["itbhu.ac.in", "iitbhu.ac.in"];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const domain = email.split("@")[1];
    if (allowedDomains.includes(domain)) {
      onLogin(email);
    } else {
      setError("Please use your institute email ID.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[350px]">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-700">
          Student Login
        </h2>

        <input
          type="email"
          placeholder="Enter institute email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
