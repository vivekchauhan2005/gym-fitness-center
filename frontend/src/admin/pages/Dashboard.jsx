import React, { useState, useEffect } from 'react';
import { FaUsers, FaDumbbell, FaCalendar, FaEnvelope, FaTicketAlt, FaUserPlus } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/admin/dashboard');
      setStats(response.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { icon: <FaUsers />, label: 'Total Customers', value: stats.totalCustomers, color: 'bg-blue-500' },
    { icon: <FaUserPlus />, label: 'Active Memberships', value: stats.activeMemberships, color: 'bg-green-500' },
    { icon: <FaDumbbell />, label: 'Total Trainers', value: stats.totalTrainers, color: 'bg-purple-500' },
    { icon: <FaCalendar />, label: 'Upcoming Classes', value: stats.totalClasses, color: 'bg-orange-500' },
    { icon: <FaTicketAlt />, label: 'Total Bookings', value: stats.totalBookings, color: 'bg-pink-500' },
    { icon: <FaEnvelope />, label: 'Pending Enquiries', value: stats.pendingEnquiries, color: 'bg-red-500' },
  ];

  const COLORS = ['#FF6B35', '#E94560', '#F59E0B', '#10B981', '#3B82F6'];

  const pieData = stats.membershipDistribution?.map(item => ({
    name: item._id,
    value: item.count
  })) || [];

  const barData = stats.monthlyRegistrations?.map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    registrations: item.count
  })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-secondary">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Monthly Registrations</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData.reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrations" fill="#FF6B35" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Membership Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {stats.recentEnquiries && stats.recentEnquiries.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Recent Enquiries</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-sm">{enquiry.name}</td>
                    <td className="py-2 text-sm">{enquiry.subject}</td>
                    <td className="py-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        enquiry.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                        enquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-2 text-sm">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;