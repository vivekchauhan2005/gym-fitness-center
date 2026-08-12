import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt, FaHome, FaInfoCircle, FaDumbbell, FaUsers, FaCalendar, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle /> },
    { to: '/memberships', label: 'Memberships', icon: <FaDumbbell /> },
    { to: '/trainers', label: 'Trainers', icon: <FaUsers /> },
    { to: '/classes', label: 'Classes', icon: <FaCalendar /> },
    { to: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className={`font-heading font-bold text-xl ${isScrolled ? 'text-secondary' : 'text-white'}`}>
              Fitness<span className="gradient-text">Center</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-secondary' : 'text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="relative group">
                  <button className={`flex items-center space-x-2 ${isScrolled ? 'text-secondary' : 'text-white'}`}>
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-secondary hover:bg-gray-100">
                      <FaUser className="inline mr-2" /> Profile
                    </Link>
                    <Link to="/my-bookings" className="block px-4 py-2 text-secondary hover:bg-gray-100">
                      <FaCalendar className="inline mr-2" /> My Bookings
                    </Link>
                    <Link to="/my-membership" className="block px-4 py-2 text-secondary hover:bg-gray-100">
                      <FaDumbbell className="inline mr-2" /> My Membership
                    </Link>
                    <hr className="my-2" />
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                      <FaSignOutAlt className="inline mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className={`font-medium ${isScrolled ? 'text-secondary' : 'text-white'} hover:text-primary`}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Join Now
                </Link>
              </>
            )}
          </div>

          <button
            className={`lg:hidden ${isScrolled ? 'text-secondary' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="container-custom py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 text-secondary hover:text-primary border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block py-3 text-secondary hover:text-primary border-b border-gray-100">
                  <FaUser className="inline mr-3" /> Profile
                </Link>
                <Link to="/my-bookings" className="block py-3 text-secondary hover:text-primary border-b border-gray-100">
                  <FaCalendar className="inline mr-3" /> My Bookings
                </Link>
                <Link to="/my-membership" className="block py-3 text-secondary hover:text-primary border-b border-gray-100">
                  <FaDumbbell className="inline mr-3" /> My Membership
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block py-3 text-primary hover:text-primary border-b border-gray-100">
                    <FaCog className="inline mr-3" /> Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left py-3 text-red-500">
                  <FaSignOutAlt className="inline mr-3" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-3 text-secondary hover:text-primary border-b border-gray-100">
                  Login
                </Link>
                <Link to="/register" className="block py-3 text-primary font-semibold">
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;