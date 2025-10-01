import React, { useState } from "react";

// Mock data
const mockTickets = [
  { id: 1, student: "Vansh Shrivas", title: "Internship Request", status: "Pending" },
  { id: 2, student: "Riya Sharma", title: "Workshop Approval", status: "Pending" },
];

export default function Tickets() {
  const [tickets, setTickets] = useState(mockTickets);

  const updateStatus = (id, status) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Raised Tickets</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="border px-4 py-2">{ticket.student}</td>
              <td className="border px-4 py-2">{ticket.title}</td>
              <td className="border px-4 py-2">{ticket.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateStatus(ticket.id, "Verified")}
                >
                  Verify
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => updateStatus(ticket.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
