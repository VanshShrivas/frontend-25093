
import './App.css'
import React, { useState } from "react";
import AdminNavbar from '../pages/AdminNavbar';
import Tickets from '../pages/Tickets';
import AddActivity from '../pages/AddActivity';
import { Routes, Route, Outlet,Navigate } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <AdminNavbar />
      <main style={{ padding: '20px' }}>
        <Outlet /> 
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/admin/tickets" /> } />

      <Route path="/admin" element={<AppLayout />}>
        <Route path="activity" element={<AddActivity />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>

    </Routes>
  );
}

export default App;
