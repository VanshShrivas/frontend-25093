import React, { useEffect, useState } from "react";

// Mock data

const base = 'http://localhost:5000'


export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    async function getIt() {
      const activities = await fetch(`${base}/api/v1/activity/getallunverifiedactivities`, {
        method: "GET",
        credentials: "include"
      })
      const data = await activities.json()
      setTickets(() => data.activities)
      setLoading(false)

      console.log(data)

    }
    getIt()
  }, [loading])


const verifyUserActivity = async (data) => {
  try {
    // console.log(data)
    const response = await fetch(`${base}/api/v1/activity/verifyactivity/${data && data._id}`, {
      method: 'PUT',
    credentials:'include'});

    if (!response.ok) {
      // Handle HTTP errors like 404 or 500
      throw new Error(`HTTP error! Status: ${response.status}`);
      // console.log("the error ",response)
    }

    const result = await response.json(); // Parse the JSON response from the server
    console.log('Success:', result);
    setLoading(true)
    return result;

  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

const rejectUserActivity = async (data) => {
  try {
    // console.log(data)
    const response = await fetch(`${base}/api/v1/activity/deleteactivity/${data && data._id}`, {
      method: 'DELETE',
    credentials:'include'});

    if (!response.ok) {
      // Handle HTTP errors like 404 or 500
      throw new Error(`HTTP error! Status: ${response.status}`);
      // console.log("the error ",response)
    }

    const result = await response.json(); // Parse the JSON response from the server
    console.log('Success:', result);
    setLoading(true)
    return result;

  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

return (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Raised Tickets</h2>
    {loading?
    <div>
      <h2>loading ...</h2>
    </div>
    :
      <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Student</th>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr >
            <td className="border px-4 py-2">{ticket && ticket.createdBy && ticket && ticket.createdBy.Name || ''}</td>
            <td className="border px-4 py-2">{ticket && ticket.title || ''}</td>
            <td className="border px-4 py-2">{ticket && ticket.type || ''}</td>
            <td className="border px-4 py-2">pending</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => verifyUserActivity(ticket)}
              >
                Verify
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => rejectUserActivity(ticket)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  </div>
);
}
