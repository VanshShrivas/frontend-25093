import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Admin Panel</h1>
      <div className="space-x-4">
        <NavLink className="hover:underline" to={`/admin/tickets`}            >
          Tickets
         </NavLink>
         <NavLink className="hover:underline" to={`/admin/activity`}            >
          Activities
         </NavLink>
      </div>
    </nav>
  );
}
