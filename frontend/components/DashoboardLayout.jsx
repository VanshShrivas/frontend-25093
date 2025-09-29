import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ user }) {
  const [open, setOpen] = useState(false);
  const scroll_ref = useRef(null);

  const handleScroll = () => {
  scroll_ref.current.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <>
      <div  className="flex min-h-screen bg-blue-50">
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main Content */}
        <div  className="flex-1 md:ml-5 p-6 overflow-y-auto h-screen" ref={scroll_ref}>
          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden bg-none text-gray-500 py-2 rounded mb-4"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <h1  ref={scroll_ref} className="text-2xl font-bold text-blue-800 mb-4">
            Welcome, {user}
          </h1>
          <Outlet />
        </div>
      </div>

      {/* Scroll-to-top button */}
      <button
        onClick={handleScroll}
        className="z-30 cursor-pointer right-5 bottom-5 p-3 fixed text-black bg-gray-200 rounded-full shadow hover:bg-gray-300"
      >
        ↑
      </button>
    </>
  );
}
