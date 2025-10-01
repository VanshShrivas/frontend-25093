// components/LoginPage.jsx
import React, { useState } from "react";
import {handlePasswordLogin} from "../src/Config.js";
<<<<<<< HEAD
import axios from "axios";
=======

>>>>>>> 6dd9dee3ca97462f2410e50fc40ccd69759d2000
// import { useNavigate } from "react-router-dom";


const allowedDomains = ["itbhu.ac.in", "iitbhu.ac.in"];

export default function LoginPage({ onLogin,handleGoogleLogin }) {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = () => {
    const domain = email.split("@")[1];
    if (allowedDomains.includes(domain)) {
      const check =  handlePasswordLogin(email,password);
      if(check)
      onLogin(email);
      else{
        onLogin(null)
      }

    } else {
      setError("Please use your institute email ID.");
    }
  };

  const handleButtonClick = async () => {
     try {
      const user = await handleGoogleLogin(setError); // call function from Config.js
      onLogin(user); //  set user state in App.jsx
      // navigate("/dashboard/account"); //  navigate to account
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  
         const dividerStyle = {
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          margin: '25px 0',
          color: '#aaa',
          };

        const lineStyle = {
          flex: 1,
          borderBottom: '1px solid #ddd',
        };

      const spanStyle = {
        padding: '0 10px',
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

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-3"
        />

      

        {/* {error && <p className="text-red-500 text-sm mb-2">{error}</p>} */}

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

        
        <button type="button"
         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleButtonClick}>
            {/*<img src={googleLogo} alt="Google logo"/>*/}

            Sign up with Google
        </button>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      </div>
    </div>
  );
}
