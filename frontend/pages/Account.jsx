import React from "react";

export default function Accounts() {
  const handleLogOut = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_BACKEND_USER}/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        window.location.reload();
      } else {
        console.log("Logout failed: " + data.message);
      }

    } catch (err) {
      console.log(err.message);
    }

  }
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Remember</h2>
      <p className="text-gray-600">Stay Awesome!! Work Hard !! Enjoy Life</p>
      <button onClick={handleLogOut} className="cursor-pointer block w-30 bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded-lg shadow text-center">LogOut</button>
    </div>
  );
}
