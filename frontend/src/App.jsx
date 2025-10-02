// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import DashboardLayout from "../components/DashoboardLayout";
import Account from "../pages/Account";
import Achievements from "../pages/Achievements";
import Marksheets from "../pages/Marksheets";
import Academics from "../pages/Academics";
import Portfolio from "../pages/Portfolio";
import Attendance from "../pages/Attendance";
import RaiseTicket from "../pages/RaiseTicket";
import MyTickets from "../pages/MyTickets";
import {handleGoogleLogin} from "./Config.js";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard/account" /> : <LoginPage onLogin={setUser} handleGoogleLogin={handleGoogleLogin} />} />

        <Route path="/dashboard" element={user ? <DashboardLayout user={user} /> : <Navigate to="/" />}>
          <Route path="account" element={<Account />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="marksheets" element={<Marksheets />} />
          <Route path="academics" element={<Academics />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="attendance" element={<Attendance />} />

          <Route path="raise-ticket" element={<RaiseTicket />} />
          <Route path="my-tickets" element={<MyTickets />} />
        </Route>
      </Routes>
    </Router>
  );
}
