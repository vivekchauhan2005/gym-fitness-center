import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', duration: 'Monthly', description: '',
    features: [], popular: false, status: 'active'
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await adminApi.get('/memberships');
      console.log('Memberships response:', response.data);
      setMemberships(response.data.data || []);
    } catch (error) {
      console.error('Error fetching memberships:', error);
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
        features: membership.features || [],
        popular: membership.popular || false,
        status: membership.status || 'active'
      });
    } else {
      setEditing(null);
      setFormData({
        name: '', price: '', duration: 'Monthly', description: '',
        features: [], popular: false, status: 'active'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => { setShowModal(false); setEditing(null); setFeatureInput(''); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi.put(`/memberships/${editing}`, formData);
        toast.success('Membership updated successfully');
      } else {
        await adminApi.post('/memberships', formData);
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
        await adminApi.delete(`/memberships/${id}`);
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
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Memberships</h1>
          <p className="text-blue-500">Manage membership plans</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02] flex items-center gap-2">
          <FaPlus /> Add Plan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {memberships.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-blue-400">No memberships found</td>
                </tr>
              ) : (
                memberships.map((membership) => (
                  <tr key={membership._id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-900">{membership.name}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">${membership.price}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{membership.duration}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${membership.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {membership.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => handleOpenModal(membership)} className="text-blue-500 hover:text-blue-700 mr-3"><FaEdit /></button>
                      <button onClick={() => handleDelete(membership._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">{editing ? 'Edit Membership' : 'Add Membership'}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700"><FaTimes size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Plan Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Price *</label><input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Duration *</label><select name="duration" value={formData.duration} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option value="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Half-Yearly">Half-Yearly</option><option value="Yearly">Yearly</option>
                </select></div>
              </div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Description *</label><textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="flex-1 px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Add a feature" />
                  <button type="button" onClick={handleAddFeature} className="bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-600 transition">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {feature}
                      <button type="button" onClick={() => handleRemoveFeature(index)} className="text-red-500 hover:text-red-700"><FaTimes size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-blue-700"><input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} className="w-4 h-4 text-blue-600" /> Popular</label>
                <label className="flex items-center gap-2 text-blue-700"><input type="checkbox" checked={formData.status === 'active'} onChange={(e) => setFormData({...formData, status: e.target.checked ? 'active' : 'inactive'})} className="w-4 h-4 text-blue-600" /> Active</label>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02]">
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