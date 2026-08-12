import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaClock, FaCalendar } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const MyMembership = () => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    try {
      const response = await api.get('/api/membership-registrations/my');
      setMembership(response.data.data);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error('Failed to load membership');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 section-padding bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
            My <span className="gradient-text">Membership</span>
          </h1>

          {!membership ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">You don't have an active membership.</p>
              <p className="text-gray-500 mt-2">Choose a plan that fits your fitness goals.</p>
              <Link to="/memberships" className="btn-primary inline-block mt-4">
                View Plans
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-secondary">
                  {membership.plan?.name}
                </h2>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  membership.status === 'active' ? 'bg-green-100 text-green-800' :
                  membership.status === 'expired' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {membership.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-primary">${membership.plan?.price}</p>
                    <p className="text-sm text-gray-600">per {membership.plan?.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Started</p>
                    <p className="font-medium text-secondary">{new Date(membership.startDate).toLocaleDateString()}</p>
                  </div>
                  {membership.endDate && (
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p className="font-medium text-secondary">{new Date(membership.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Features</p>
                  <ul className="space-y-2">
                    {membership.plan?.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <FaCheck className="text-primary mr-2" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {membership.message && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Additional Message</p>
                  <p className="text-gray-600">{membership.message}</p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/memberships" className="btn-primary">
                  Upgrade Plan
                </Link>
                <Link to="/classes" className="btn-secondary bg-gray-200 text-secondary hover:bg-gray-300">
                  Book a Class
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMembership;