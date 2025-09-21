import React from "react";

export default function MyTickets() {
  // Dummy ticket list
  const tickets = [
    { id: 1, title: "Elyx Hackathon", status: "Pending" },
    { id: 2, title: "PM Achiever's Runner-Up", status: "Verified" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets raised yet.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex justify-between border p-3 rounded-lg hover:bg-blue-50"
            >
              <span>{ticket.title}</span>
              <span
                className={`${
                  ticket.status === "Verified"
                    ? "text-green-600"
                    : "text-yellow-600"
                } font-semibold`}
              >
                {ticket.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
