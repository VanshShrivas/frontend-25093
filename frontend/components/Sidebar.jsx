import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const links = [
    { to: "achievements", label: "Achievements" },
    { to: "marksheets", label: "Marksheets" },
    { to: "academics", label: "Academics" },
    { to: "portfolio", label: "Digital Portfolio" },
    { to: "attendance", label: "Attendance Tracker" },
  ];

  return (
    <div
      className={`fixed md:static z-20 bg-white shadow-md w-60 h-screen p-5 space-y-4 transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 flex flex-col`}
    >
      <h2 className="text-lg font-bold text-blue-700 mb-4">
        Student's Dashboard
      </h2>

      <ul className="space-y-2 flex-1">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={`/dashboard/${link.to}`}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-blue-100 ${
                  isActive
                    ? "bg-blue-200 text-blue-700 font-bold"
                    : "text-gray-700"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}

        {/* Ticket Buttons */}
        <div className="flex flex-col items-center gap-4 mt-3">
          <li>
            <NavLink
              to={`/dashboard/raise-ticket`}
              onClick={() => setOpen(false)}
              className="block w-30 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-center"
            >
              Raise Ticket
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/my-tickets`}
              onClick={() => setOpen(false)}
              className="block w-30 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow text-center"
            >
              My Tickets
            </NavLink>
          </li>
        </div>

        {/* Bottom My Account */}
        <li className="absolute bottom-[15px] text-sm text-gray-500 w-max">
          <NavLink
            to={`/dashboard/account`}
            className={({ isActive }) =>
              `w-full block p-2 rounded hover:bg-gray-100 ${
                isActive
                  ? "bg-gray-200 text-red-700 font-semibold"
                  : "text-gray-700"
              }`
            }
            onClick={() => setOpen(false)}
          >
            My Account
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
