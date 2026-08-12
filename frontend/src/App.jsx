import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import MembershipPlans from './pages/MembershipPlans';
import Trainers from './pages/Trainers';
import ClassSchedule from './pages/ClassSchedule';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';

import MyProfile from './pages/MyProfile';
import MyBookings from './pages/MyBookings';
import MyMembership from './pages/MyMembership';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './admin/pages/Dashboard';
import AdminMemberships from './admin/pages/Memberships';
import AdminTrainers from './admin/pages/Trainers';
import AdminClasses from './admin/pages/Classes';
import AdminEnquiries from './admin/pages/Enquiries';
import AdminCustomers from './admin/pages/Customers';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#10B981',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
            <Route path="/memberships" element={<><Navbar /><MembershipPlans /><Footer /></>} />
            <Route path="/trainers" element={<><Navbar /><Trainers /><Footer /></>} />
            <Route path="/classes" element={<><Navbar /><ClassSchedule /><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
            <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
            <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />

            <Route path="/profile" element={<ProtectedRoute><><Navbar /><MyProfile /><Footer /></></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute><><Navbar /><MyBookings /><Footer /></></ProtectedRoute>} />
            <Route path="/my-membership" element={<ProtectedRoute><><Navbar /><MyMembership /><Footer /></></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="memberships" element={<AdminMemberships />} />
              <Route path="trainers" element={<AdminTrainers />} />
              <Route path="classes" element={<AdminClasses />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="customers" element={<AdminCustomers />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;