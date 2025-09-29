import React from "react";
const dummyAttendance=[
  { totalDays: 22, presents: 20, month: "January", year: 2025 },
  { totalDays: 20, presents: 18, month: "February", year: 2025 },
  { totalDays: 23, presents: 21, month: "March", year: 2025 },
  { totalDays: 21, presents: 19, month: "April", year: 2025 },
  { totalDays: 22, presents: 22, month: "May", year: 2025 },
  { totalDays: 0, presents: 0, month: "June", year: 2025 },
  { totalDays: 23, presents: 22, month: "July", year: 2025 },
  { totalDays: 22, presents: 21, month: "August", year: 2025 },
  { totalDays: 21, presents: 19, month: "September", year: 2025 },
  { totalDays: 22, presents: 20, month: "October", year: 2025 },
  { totalDays: 21, presents: 21, month: "November", year: 2025 },
  { totalDays: 22, presents: 21, month: "December", year: 2025 },
];

export default function Attendance() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Attendance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Year</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Month</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Days</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Presents</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyAttendance.map((item, index) => {
              const percentage = (item.totalDays!=0)?((item.presents / item.totalDays) * 100).toFixed(2):"-";
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{item.year}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.month}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.totalDays}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.presents}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
