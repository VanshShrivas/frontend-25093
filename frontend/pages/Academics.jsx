import React from "react";

export default function Academics() {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Academics</h2>
      <p className="text-gray-600">
        Track your academic progress, courses, and grades here.
      </p>

      {/* Academic Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-semibold text-blue-700">CGPA</h3>
          <p className="text-2xl font-bold text-gray-800">9.15</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-semibold text-green-700">Credits</h3>
          <p className="text-2xl font-bold text-gray-800">92</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-semibold text-yellow-700">Semesters</h3>
          <p className="text-2xl font-bold text-gray-800">6</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-semibold text-purple-700">Rank</h3>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
      </div>

      {/* Current Semester Courses */}
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Current Semester (Sem 6)
        </h3>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Course Code</th>
              <th className="p-2 text-left">Course Name</th>
              <th className="p-2 text-left">Credits</th>
              <th className="p-2 text-left">Grade</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-t">
              <td className="p-2">CS601</td>
              <td className="p-2">Machine Learning</td>
              <td className="p-2">4</td>
              <td className="p-2">A</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">CS602</td>
              <td className="p-2">Distributed Systems</td>
              <td className="p-2">3</td>
              <td className="p-2">B+</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">CS603</td>
              <td className="p-2">Data Mining</td>
              <td className="p-2">3</td>
              <td className="p-2">A-</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">CS604</td>
              <td className="p-2">Cloud Computing</td>
              <td className="p-2">4</td>
              <td className="p-2">B</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Previous Semester Performance */}
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Previous Semester Performance
        </h3>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Semester</th>
              <th className="p-2 text-left">GPA</th>
              <th className="p-2 text-left">Credits Earned</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-t">
              <td className="p-2">Semester 1</td>
              <td className="p-2">8.2</td>
              <td className="p-2">20</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Semester 2</td>
              <td className="p-2">8.5</td>
              <td className="p-2">18</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Semester 3</td>
              <td className="p-2">8.6</td>
              <td className="p-2">16</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Semester 4</td>
              <td className="p-2">9.0</td>
              <td className="p-2">20</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Semester 5</td>
              <td className="p-2">8.8</td>
              <td className="p-2">18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
