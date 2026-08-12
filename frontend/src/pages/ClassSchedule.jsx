import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaClock, FaUsers, FaCalendar, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const ClassSchedule = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/api/classes');
      setClasses(response.data.data);
    } catch (error) {
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = async (classId) => {
    if (!isAuthenticated) {
      toast.error('Please login to book a class');
      return;
    }
    try {
      await api.post('/api/bookings', { classId });
      toast.success('Class booked successfully!');
      fetchClasses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book class');
    }
  };

  const categories = ['all', ...new Set(classes.map(c => c.category))];

  const filteredClasses = filter === 'all' 
    ? classes 
    : classes.filter(c => c.category === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
            Class <span className="gradient-text">Schedule</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Browse our classes and book your spot today.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === category 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <div key={cls._id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-secondary">{cls.name}</h3>
                    <p className="text-primary text-sm font-semibold">{cls.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    cls.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    cls.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {cls.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-gray-600 text-sm">
                  <p><FaCalendar className="inline mr-2" /> {new Date(cls.date).toLocaleDateString()}</p>
                  <p><FaClock className="inline mr-2" /> {cls.startTime} - {cls.endTime}</p>
                  <p><FaUsers className="inline mr-2" /> {cls.availableSeats} / {cls.capacity} seats available</p>
                </div>
                {cls.trainer && (
                  <div className="mt-4 flex items-center">
                    <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {cls.trainer.name?.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-secondary">{cls.trainer.name}</p>
                      <p className="text-gray-500 text-xs">{cls.trainer.specialization}</p>
                    </div>
                  </div>
                )}
                {cls.description && (
                  <p className="text-gray-600 text-sm mt-3">{cls.description}</p>
                )}
                <button
                  onClick={() => handleBookClass(cls._id)}
                  disabled={cls.availableSeats <= 0 || cls.status !== 'upcoming'}
                  className={`btn-primary w-full mt-4 ${
                    cls.availableSeats <= 0 || cls.status !== 'upcoming' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {cls.availableSeats <= 0 ? 'Class Full' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;