import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaDumbbell, FaTachometerAlt, FaUsers, FaUserTie, 
  FaCalendarAlt, FaEnvelope, FaSignOutAlt, FaHome,
  FaCrown
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/members', icon: <FaUsers />, label: 'Members' },
    { path: '/trainers', icon: <FaUserTie />, label: 'Trainers' },
    { path: '/memberships', icon: <FaCrown />, label: 'Memberships' },
    { path: '/classes', icon: <FaCalendarAlt />, label: 'Classes' },
    { path: '/enquiries', icon: <FaEnvelope />, label: 'Enquiries' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-950 via-indigo-950 to-blue-950 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center gap-3 p-6 border-b border-blue-800/50">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FaDumbbell className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Admin Panel</h1>
            <p className="text-blue-400 text-xs">Gym Fitness Center</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-blue-300 hover:bg-blue-800/50 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800/50">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-300 hover:text-white hover:bg-blue-800/50 rounded-xl transition-all"
          >
            <FaHome className="text-lg" />
            <span className="font-medium">View Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-1"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;