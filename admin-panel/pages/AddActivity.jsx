import React, { useState } from "react";

export default function AddActivity() {
  const [form, setForm] = useState({ student: "", title: "", description: "" });
  const [activities, setActivities] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setActivities(prev => [...prev, form]);
    setForm({ student: "", title: "", description: "" });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
        <input
          type="text"
          placeholder="Student Name"
          value={form.student}
          onChange={e => setForm({ ...form, student: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Activity Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Activity
        </button>
      </form>

      {activities.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Activities Added:</h3>
          <ul className="list-disc pl-5">
            {activities.map((a, i) => (
              <li key={i}>
                {a.student} - {a.title}: {a.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
