import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, FaDumbbell, FaUsers, FaCalendar, FaEnvelope, FaUser, FaSignOutAlt, 
  FaBars, FaTimes, FaTachometerAlt 
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { to: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { to: '/admin/memberships', icon: <FaDumbbell />, label: 'Memberships' },
    { to: '/admin/trainers', icon: <FaUsers />, label: 'Trainers' },
    { to: '/admin/classes', icon: <FaCalendar />, label: 'Classes' },
    { to: '/admin/enquiries', icon: <FaEnvelope />, label: 'Enquiries' },
    { to: '/admin/customers', icon: <FaUser />, label: 'Customers' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-heading font-bold">Admin Panel</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <FaTimes />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-primary/20 rounded-lg px-4 py-3 transition"
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg px-4 py-3 transition w-full mt-4"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-secondary">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold text-secondary">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden md:inline">Welcome, Admin</span>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
              <FaSignOutAlt />
            </button>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;