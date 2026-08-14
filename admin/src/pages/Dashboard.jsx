import React, { useState, useEffect } from 'react';
import { FaUsers, FaDumbbell, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalTrainers: 0,
    totalClasses: 0,
    pendingEnquiries: 0,
    activeMemberships: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Change this from '/admin' to '/dashboard'
      const response = await adminApi.get('/dashboard');
      console.log('Dashboard API Response:', response);
      
      if (response.data && response.data.success) {
        setStats(response.data.data);
      } else {
        console.warn('Dashboard API returned unsuccessful response:', response.data);
        toast.error('Could not load all dashboard data');
      }
    } catch (error) {
      console.error('Dashboard API Error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(error.response.data?.message || 'Failed to load dashboard');
      } else {
        toast.error('Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    { icon: <FaUsers />, title: 'Total Members', value: stats?.totalCustomers || 0, color: 'from-blue-500 to-blue-600' },
    { icon: <FaDumbbell />, title: 'Total Trainers', value: stats?.totalTrainers || 0, color: 'from-indigo-500 to-indigo-600' },
    { icon: <FaCalendarAlt />, title: 'Upcoming Classes', value: stats?.totalClasses || 0, color: 'from-cyan-500 to-cyan-600' },
    { icon: <FaEnvelope />, title: 'Pending Enquiries', value: stats?.pendingEnquiries || 0, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-blue-500">Welcome back, Admin!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-500 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;