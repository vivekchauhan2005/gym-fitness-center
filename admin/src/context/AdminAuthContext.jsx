import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }

  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);

        if (parsedUser.role === 'admin') {
          setAdmin(parsedUser);
        } else {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || 'Invalid email or password');

        return {
          success: false
        };
      }

      if (!data.user || data.user.role !== 'admin') {
        toast.error('You are not authorized as admin');

        return {
          success: false
        };
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem(
        'adminUser',
        JSON.stringify(data.user)
      );

      setAdmin(data.user);

      toast.success('Welcome Admin!');

      navigate('/admin/dashboard');

      return {
        success: true
      };

    } catch (error) {
      console.error('Login error:', error);

      toast.error(
        'Unable to connect to backend server'
      );

      return {
        success: false
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');

    setAdmin(null);

    toast.success('Logged out successfully');

    navigate('/admin/login');
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};