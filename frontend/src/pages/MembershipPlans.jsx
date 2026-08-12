import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    message: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan');
    fetchPlans(planId);
  }, [location]);

  const fetchPlans = async (planId) => {
    try {
      const response = await api.get('/api/memberships');
      setPlans(response.data.data);
      if (planId) {
        const plan = response.data.data.find(p => p._id === planId);
        if (plan) {
          setSelectedPlan(plan);
          setShowForm(true);
        }
      }
    } catch (error) {
      toast.error('Failed to load membership plans');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    if (!isAuthenticated) {
      toast.error('Please login to register for a membership');
      navigate('/login');
      return;
    }
    setSelectedPlan(plan);
    setShowForm(true);
    setFormData({
      ...formData,
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/membership-registrations', {
        planId: selectedPlan._id,
        ...formData
      });
      toast.success('Membership registered successfully!');
      setShowForm(false);
      navigate('/my-membership');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
    <div className="pt-20 section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
            Our Membership <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the perfect plan for your fitness journey. All plans include access to our world-class facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan._id} className={`bg-white rounded-2xl shadow-lg overflow-hidden card-hover ${plan.popular ? 'border-2 border-primary' : ''}`}>
              {plan.popular && (
                <div className="bg-primary text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-secondary">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-heading font-bold text-primary">${plan.price}</span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>
                <p className="text-gray-600 mt-4">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <FaCheck className="text-primary mr-3" /> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className="btn-primary w-full text-center mt-8"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-secondary">
                  Register for {selectedPlan.name}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipPlans;