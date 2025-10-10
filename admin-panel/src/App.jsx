import './App.css'
import React,{useState} from "react";
import AdminNavbar from '../pages/AdminNavbar';
import Tickets from '../pages/Tickets';
import AddActivity from '../pages/AddActivity';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { handleGoogleLogin } from './Config';

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

  const [user,setUser] = useState(null)

  return (
    <Routes>
      {/* Root route redirects to admin/tickets */}
      <Route path="/" element={user?<Navigate to="/admin/tickets" />: <LoginPage onLogin={setUser} handleGoogleLogin={handleGoogleLogin}/>} />

      <Route path="/admin" element={<AppLayout />}>
        {/* Default child route for /admin */}
        <Route index element={<Navigate to="tickets" />} />

        <Route path="activity" element={<AddActivity />} />
        <Route path="tickets" element={<Tickets />} />

        {/* Catch-all for unknown routes under /admin */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Route>

      {/* Global catch-all (if user types anything invalid) */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
