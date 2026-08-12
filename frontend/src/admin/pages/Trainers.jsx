import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', specialization: '', experience: '',
    bio: '', certifications: [], image: '', status: 'active',
    socialLinks: { facebook: '', instagram: '', twitter: '', linkedin: '' }
  });
  const [certInput, setCertInput] = useState('');

  useEffect(() => { fetchTrainers(); }, []);

  const fetchTrainers = async () => {
    try {
      const response = await api.get('/api/trainers');
      setTrainers(response.data.data);
    } catch (error) {
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
      setFormData({
        name: '', email: '', phone: '', specialization: '', experience: '',
        bio: '', certifications: [], image: '', status: 'active',
        socialLinks: { facebook: '', instagram: '', twitter: '', linkedin: '' }
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => { setShowModal(false); setEditing(null); setCertInput(''); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({ ...formData, [parent]: { ...formData[parent], [child]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCert = () => {
    if (certInput.trim()) {
      setFormData({ ...formData, certifications: [...formData.certifications, certInput.trim()] });
      setCertInput('');
    }
  };

  const handleRemoveCert = (index) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/api/trainers/${editing}`, formData);
        toast.success('Trainer updated successfully');
      } else {
        await api.post('/api/trainers', formData);
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
        await api.delete(`/api/trainers/${id}`);
        toast.success('Trainer deleted successfully');
        fetchTrainers();
      } catch (error) {
        toast.error('Failed to delete trainer');
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="loading-spinner"></div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-secondary">Trainers</h2>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add Trainer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-secondary">{trainer.name}</td>
                  <td className="px-6 py-4 text-sm">{trainer.specialization}</td>
                  <td className="px-6 py-4 text-sm">{trainer.experience}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      trainer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>{trainer.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleOpenModal(trainer)} className="text-blue-500 hover:text-blue-700 mr-3"><FaEdit /></button>
                    <button onClick={() => handleDelete(trainer._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
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
                {editing ? 'Edit Trainer' : 'Add Trainer'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                  <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                <input type="text" name="experience" value={formData.experience} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={certInput} onChange={(e) => setCertInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="Add certification" />
                  <button type="button" onClick={handleAddCert} className="btn-primary">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      {cert}
                      <button type="button" onClick={() => handleRemoveCert(index)} className="ml-2 text-red-500"><FaTimes size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  <input type="text" name="socialLinks.facebook" value={formData.socialLinks.facebook} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input type="text" name="socialLinks.instagram" value={formData.socialLinks.instagram} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.status === 'active'} onChange={(e) => setFormData({...formData, status: e.target.checked ? 'active' : 'inactive'})} className="mr-2" />
                  Active
                </label>
              </div>
              <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'} Trainer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;