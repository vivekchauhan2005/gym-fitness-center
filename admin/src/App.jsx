import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Trainers from './pages/Trainers';
import Memberships from './pages/Memberships';
import Classes from './pages/Classes';
import Enquiries from './pages/Enquiries';

function App() {
  const isAuthenticated = localStorage.getItem('adminToken');

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
          success: { duration: 3000, style: { background: '#10B981' } },
          error: { duration: 4000, style: { background: '#EF4444' } },
        }}
      />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <AdminLayout><Dashboard /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/members" element={isAuthenticated ? <AdminLayout><Members /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/trainers" element={isAuthenticated ? <AdminLayout><Trainers /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/memberships" element={isAuthenticated ? <AdminLayout><Memberships /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/classes" element={isAuthenticated ? <AdminLayout><Classes /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/enquiries" element={isAuthenticated ? <AdminLayout><Enquiries /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;