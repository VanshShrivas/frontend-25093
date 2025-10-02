import React from "react";

export default function Marksheets() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Marksheets</h2>
      <p className="text-gray-600 mb-4">
        Here you can add and track your Marksheets.
      </p>

      <div className="space-y-2">
        <a
          href="/dummy-files/Sem1.pdf"
          download
          className="block bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-sm transition"
        >
          📄 Semester 1 Gradesheet
        </a>
        <a
          href="/dummy-files/Sem2.pdf"
          download
          className="block bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-sm transition"
        >
          📄 Semester 2 Gradesheet
        </a>
      </div>
    </div>
  );
}
