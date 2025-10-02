import React, { useState, useEffect } from "react";

const base = "http://localhost:3000/api/v1/activity";

export default function Achievements() {
  const [type, setCat] = useState("All");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${base}/getallactivities`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success) {
          setActivities(data.activities);
        } else {
          setError(data.message || "Failed to fetch activities");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const categories = ["All", ...new Set(activities.map((ele) => ele.type))];

  let filtered =
    type === "All"
      ? activities
      : activities.filter((ele) => ele.type === type);

  if (onlyVerified) {
    filtered = filtered.filter((ele) => ele.isVerified);
  }

  if (loading) {
    return <div className="p-6">Loading activities...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Achievements</h2>

      {/* Filters Section */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Dropdown Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by type
          </label>
          <select
            value={type}
            onChange={(e) => setCat(e.target.value)}
            className="w-full md:w-60 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Verified Only Checkbox */}
        <div className="flex items-center mt-6 md:mt-0">
          <input
            id="verifiedOnly"
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="verifiedOnly"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Show only verified
          </label>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((ele, idx) => {
            // Format createdAt date (agar hai toh)
            const dateStr = ele.createdAt
              ? new Date(ele.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : null;

            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                  {ele.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1">{ele.description}</p>

                {/* Type Badge */}
                <div className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {ele.type}
                </div>

                {/* Verified Badge */}
                {ele.isVerified && (
                  <div className="mt-3 text-green-600 text-sm font-medium flex items-center gap-1">
                    ✅ <span className="hidden sm:inline">Verified</span>
                  </div>
                )}

                {/* Created At Date */}
                {dateStr && (
                  <div className="mt-2 text-xs text-gray-500">
                    📅 {dateStr}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No activities found
          </div>
        )}
      </div>
    </div>
  );
}
