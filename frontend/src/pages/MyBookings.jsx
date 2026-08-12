import React, { useState, useEffect } from 'react';
import { FaCalendar, FaClock, FaUsers, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings/my');
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.delete(`/api/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
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
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
            My <span className="gradient-text">Bookings</span>
          </h1>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">You haven't booked any classes yet.</p>
              <p className="text-gray-500 mt-2">Browse our classes and book your first session today!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-xl shadow-lg p-6 card-hover">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-secondary">
                        {booking.class?.name || 'Class'}
                      </h3>
                      <p className="text-primary text-sm">{booking.class?.category}</p>
                      <div className="mt-2 space-y-1 text-gray-600 text-sm">
                        <p><FaCalendar className="inline mr-2" /> {new Date(booking.class?.date).toLocaleDateString()}</p>
                        <p><FaClock className="inline mr-2" /> {booking.class?.startTime} - {booking.class?.endTime}</p>
                        {booking.class?.trainer && (
                          <p className="flex items-center">
                            <FaUsers className="inline mr-2" /> Trainer: {booking.class.trainer.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center"
                        >
                          <FaTimes className="mr-1" /> Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;