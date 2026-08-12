import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/enquiries', formData);
      toast.success('Enquiry sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-xl font-bold text-secondary mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-secondary">Address</p>
                    <p className="text-gray-600">123 Fitness Street, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone className="text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-secondary">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaEnvelope className="text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-secondary">Email</p>
                    <p className="text-gray-600">info@gymfitness.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-secondary">Opening Hours</p>
                    <p className="text-gray-600">Mon-Fri: 5:00 AM - 11:00 PM</p>
                    <p className="text-gray-600">Sat-Sun: 6:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-xl font-bold text-secondary mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;