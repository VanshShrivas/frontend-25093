import React from "react";
import { useState } from "react";

export default function AdminNavbar({ setPage }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Admin Panel</h1>
      <div className="space-x-4">
        <button onClick={() => setPage("tickets")} className="hover:underline">
          Tickets
        </button>
        <button onClick={() => setPage("addActivity")} className="hover:underline">
          Add Activity
        </button>
      </div>
    </nav>
  );
}
