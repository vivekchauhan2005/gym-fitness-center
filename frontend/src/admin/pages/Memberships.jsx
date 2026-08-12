import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: 'Monthly',
    description: '',
    features: [],
    popular: false,
    status: 'active'
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await api.get('/api/memberships');
      setMemberships(response.data.data);
    } catch (error) {
      toast.error('Failed to load memberships');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (membership = null) => {
    if (membership) {
      setEditing(membership._id);
      setFormData({
        name: membership.name,
        price: membership.price,
        duration: membership.duration,
        description: membership.description,
        features: membership.features,
        popular: membership.popular,
        status: membership.status
      });
    } else {
      setEditing(null);
      setFormData({
        name: '',
        price: '',
        duration: 'Monthly',
        description: '',
        features: [],
        popular: false,
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditing(null);
    setFeatureInput('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/api/memberships/${editing}`, formData);
        toast.success('Membership updated successfully');
      } else {
        await api.post('/api/memberships', formData);
        toast.success('Membership created successfully');
      }
      handleCloseModal();
      fetchMemberships();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this membership?')) {
      try {
        await api.delete(`/api/memberships/${id}`);
        toast.success('Membership deleted successfully');
        fetchMemberships();
      } catch (error) {
        toast.error('Failed to delete membership');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-secondary">Membership Plans</h2>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add Plan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Popular</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {memberships.map((membership) => (
                <tr key={membership._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-secondary">{membership.name}</td>
                  <td className="px-6 py-4 text-sm">${membership.price}</td>
                  <td className="px-6 py-4 text-sm">{membership.duration}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      membership.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {membership.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{membership.popular ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleOpenModal(membership)} className="text-blue-500 hover:text-blue-700 mr-3">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(membership._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl font-bold text-secondary">
                {editing ? 'Edit Membership' : 'Add Membership'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Add a feature"
                  />
                  <button type="button" onClick={handleAddFeature} className="btn-primary">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      {feature}
                      <button type="button" onClick={() => handleRemoveFeature(index)} className="ml-2 text-red-500">
                        <FaTimes size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Popular
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData({...formData, status: e.target.checked ? 'active' : 'inactive'})}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>
              <button type="submit" className="btn-primary w-full">
                {editing ? 'Update' : 'Create'} Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships;