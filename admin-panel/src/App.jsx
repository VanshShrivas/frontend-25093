
import './App.css'
import React, { useState } from "react";
import AdminNavbar from '../pages/AdminNavbar';
import Tickets from '../pages/Tickets';
import AddActivity from '../pages/AddActivity';

export default function App() {
  const [page, setPage] = useState("tickets"); // default page

  return (
    <div>
      <AdminNavbar setPage={setPage} />
      {page === "tickets" && <Tickets />}
      {page === "addActivity" && <AddActivity />}
    </div>
  );
}

