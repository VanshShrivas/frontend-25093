// components/LoginPage.jsx
import React, { useState } from "react";

const allowedDomains = ["itbhu.ac.in", "iitbhu.ac.in"];

export default function LoginPage({ onLogin, handleGoogleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const domain = email.includes("@") ? email.split("@")[1] : "";

    if (allowedDomains.includes(domain)) {
      try {
        const response = await fetch(
          `https://localhost:5000/api/v1/user/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: email }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          onLogin(data.user.Name);
        } else {
          setError(data.message || "Login failed");
        }
      } catch (error) {
        setError("Network error. Please try again.",error);
      }
    } else {
      setError("Please use your institute email ID.");
    }
  };

  const handleButtonClick = async () => {
    try {
      const user = await handleGoogleLogin( onLogin, setError);
      onLogin(user);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "25px 0",
    color: "#aaa",
  };

  const lineStyle = {
    flex: 1,
    borderBottom: "1px solid #ddd",
  };

  const spanStyle = {
    padding: "0 10px",
  };


  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[350px]">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-700">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Enter institute email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-3"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <div style={dividerStyle}>
          <div style={lineStyle}></div>
          <span style={spanStyle}>Or</span>
          <div style={lineStyle}></div>
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleButtonClick}
        >
          Sign up with Google
        </button>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        
      </div>
    </div>
  );
}
