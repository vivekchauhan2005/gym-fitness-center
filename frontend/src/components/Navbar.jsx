import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaBars,
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaDumbbell,
  FaUsers,
  FaCalendar,
  FaEnvelope,
  FaChevronDown
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const closeMenus = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  const navLinks = [
    {
      to: '/',
      label: 'Home',
      icon: <FaHome />
    },
    {
      to: '/about',
      label: 'About',
      icon: <FaInfoCircle />
    },
    {
      to: '/memberships',
      label: 'Memberships',
      icon: <FaDumbbell />
    },
    {
      to: '/trainers',
      label: 'Trainers',
      icon: <FaUsers />
    },
    {
      to: '/classes',
      label: 'Classes',
      icon: <FaCalendar />
    },
    {
      to: '/contact',
      label: 'Contact',
      icon: <FaEnvelope />
    }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080812] shadow-xl'
          : 'bg-[#0a0a1a]/95 backdrop-blur-md'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                G
              </span>
            </div>

            <span className="font-heading font-bold text-xl text-white">
              Fitness
              <span className="text-orange-400">Center</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium text-white hover:text-orange-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-4">

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">

                {/* Admin Panel */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
                  >
                    Admin Panel
                  </Link>
                )}

                {/* Profile */}
                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setIsProfileOpen(!isProfileOpen)
                    }
                    className="flex items-center gap-2 text-white hover:text-orange-400 transition"
                  >

                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold uppercase">
                      {user?.name
                        ? user.name.charAt(0)
                        : <FaUser />}
                    </div>

                    <span className="hidden xl:block font-medium">
                      {user?.name || 'Profile'}
                    </span>

                    <FaChevronDown
                      className={`text-xs transition-transform ${
                        isProfileOpen
                          ? 'rotate-180'
                          : ''
                      }`}
                    />

                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">

                      <div className="px-4 py-3 bg-gray-50 border-b">
                        <p className="font-semibold text-gray-800">
                          {user?.name || 'User'}
                        </p>

                        <p className="text-sm text-gray-500 truncate">
                          {user?.email || ''}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                      >
                        <FaUser className="mr-3" />
                        Profile
                      </Link>

                      <Link
                        to="/my-bookings"
                        onClick={closeMenus}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                      >
                        <FaCalendar className="mr-3" />
                        My Bookings
                      </Link>

                      <Link
                        to="/my-membership"
                        onClick={closeMenus}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                      >
                        <FaDumbbell className="mr-3" />
                        My Membership
                      </Link>

                      <div className="border-t"></div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 transition"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-white hover:text-orange-400 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Join Now
                </Link>
              </>
            )}

          </div>

          {/* Mobile Button */}
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0a1a] shadow-xl">
          <div className="container-custom py-4">

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenus}
                className="flex items-center py-3 text-white hover:text-orange-400 border-b border-gray-700"
              >
                <span className="mr-3">
                  {link.icon}
                </span>

                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>

                <Link
                  to="/profile"
                  onClick={closeMenus}
                  className="flex items-center py-3 text-white hover:text-orange-400 border-b border-gray-700"
                >
                  <FaUser className="mr-3" />
                  Profile
                </Link>

                <Link
                  to="/my-bookings"
                  onClick={closeMenus}
                  className="flex items-center py-3 text-white hover:text-orange-400 border-b border-gray-700"
                >
                  <FaCalendar className="mr-3" />
                  My Bookings
                </Link>

                <Link
                  to="/my-membership"
                  onClick={closeMenus}
                  className="flex items-center py-3 text-white hover:text-orange-400 border-b border-gray-700"
                >
                  <FaDumbbell className="mr-3" />
                  My Membership
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMenus}
                    className="flex items-center py-3 text-orange-400 border-b border-gray-700"
                  >
                    <FaCog className="mr-3" />
                    Admin Panel
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center w-full py-3 text-red-400"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>

              </>
            ) : (
              <>

                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="block py-3 text-white hover:text-orange-400 border-b border-gray-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenus}
                  className="block py-3 text-orange-400 font-semibold"
                >
                  Register
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