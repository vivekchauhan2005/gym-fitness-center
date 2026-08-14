import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', specialization: '', 
    experience: '', bio: '', image: '', status: 'active'
  });

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await adminApi.get('/trainers');
      console.log('Trainers response:', response.data);
      setTrainers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      toast.error('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (trainer = null) => {
    if (trainer) {
      setEditing(trainer._id);
      setFormData(trainer);
    } else {
      setEditing(null);
      setFormData({ name: '', email: '', phone: '', specialization: '', experience: '', bio: '', image: '', status: 'active' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => { setShowModal(false); setEditing(null); };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi.put(`/trainers/${editing}`, formData);
        toast.success('Trainer updated successfully');
      } else {
        await adminApi.post('/trainers', formData);
        toast.success('Trainer created successfully');
      }
      handleCloseModal();
      fetchTrainers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        await adminApi.delete(`/trainers/${id}`);
        toast.success('Trainer deleted successfully');
        fetchTrainers();
      } catch (error) {
        toast.error('Failed to delete trainer');
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
          <h1 className="text-3xl font-bold text-blue-900">Trainers</h1>
          <p className="text-blue-500">Manage your fitness trainers</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02] flex items-center gap-2">
          <FaPlus /> Add Trainer
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {trainers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-blue-400">No trainers found</td>
                </tr>
              ) : (
                trainers.map((trainer) => (
                  <tr key={trainer._id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-900">{trainer.name}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{trainer.specialization}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{trainer.experience}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${trainer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {trainer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => handleOpenModal(trainer)} className="text-blue-500 hover:text-blue-700 mr-3"><FaEdit /></button>
                      <button onClick={() => handleDelete(trainer._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
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
              <h3 className="text-2xl font-bold text-blue-900">{editing ? 'Edit Trainer' : 'Add Trainer'}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700"><FaTimes size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Phone *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Specialization *</label><input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              </div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Experience *</label><input type="text" name="experience" value={formData.experience} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Bio *</label><textarea name="bio" value={formData.bio} onChange={handleChange} required rows="3" className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Image URL</label><input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02]">
                {editing ? 'Update' : 'Create'} Trainer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;