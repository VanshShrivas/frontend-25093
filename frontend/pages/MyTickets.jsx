
import React,{useState,useEffect} from "react";

export default function MyTickets() {
  // Dummy ticket list
  
const base = "http://localhost:3000/api/v1/activity";
const [tickets, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

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
          alert(data.message || "Failed to fetch activities");
        }
      } catch (error) {
        alert("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets raised yet.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="flex justify-between border p-3 rounded-lg hover:bg-blue-50"
            >
              <span>{ticket.title}</span>
              <span
                className={`${
                  ticket.isVerified
                    ? "text-green-600"
                    : "text-yellow-600"
                } font-semibold`}
              >
                {(ticket.isVerified)?"Verified":"Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
