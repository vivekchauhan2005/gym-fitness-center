import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="pt-20 section-padding bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
            My <span className="gradient-text">Profile</span>
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-secondary">{user.name}</h2>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FaUser className="text-primary mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-secondary">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-primary mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-secondary">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FaPhone className="text-primary mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-secondary">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FaCalendar className="text-primary mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-secondary">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;