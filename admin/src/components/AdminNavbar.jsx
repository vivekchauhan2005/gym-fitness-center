import React from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const AdminNavbar = ({ setIsOpen }) => {
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  return (
    <header className="bg-white border-b border-blue-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-blue-600 hover:text-blue-800"
        >
          <FaBars size={24} />
        </button>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-900 hidden lg:block">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-blue-500 hover:text-blue-700">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              {adminUser.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-blue-900">{adminUser.name || 'Admin'}</p>
              <p className="text-xs text-blue-500">{adminUser.email || 'admin@gymfitness.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;