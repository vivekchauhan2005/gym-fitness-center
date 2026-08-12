import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Yoga', trainer: '', date: '', startTime: '', endTime: '',
    capacity: '', description: '', status: 'upcoming'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classesRes, trainersRes] = await Promise.all([
        api.get('/api/classes'),
        api.get('/api/trainers')
      ]);
      setClasses(classesRes.data.data);
      setTrainers(trainersRes.data.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cls = null) => {
    if (cls) {
      setEditing(cls._id);
      setFormData({
        name: cls.name, category: cls.category, trainer: cls.trainer?._id || cls.trainer,
        date: cls.date?.split('T')[0] || '', startTime: cls.startTime, endTime: cls.endTime,
        capacity: cls.capacity, description: cls.description || '', status: cls.status
      });
    } else {
      setEditing(null);
      setFormData({ name: '', category: 'Yoga', trainer: '', date: '', startTime: '', endTime: '', capacity: '', description: '', status: 'upcoming' });
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
        await api.put(`/api/classes/${editing}`, formData);
        toast.success('Class updated successfully');
      } else {
        await api.post('/api/classes', formData);
        toast.success('Class created successfully');
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await api.delete(`/api/classes/${id}`);
        toast.success('Class deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete class');
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="loading-spinner"></div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-secondary">Class Schedule</h2>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add Class
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Class</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {classes.map((cls) => (
                <tr key={cls._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-secondary">{cls.name}</td>
                  <td className="px-6 py-4 text-sm">{cls.category}</td>
                  <td className="px-6 py-4 text-sm">{cls.trainer?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{new Date(cls.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">{cls.availableSeats}/{cls.capacity}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      cls.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                      cls.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                      cls.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>{cls.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleOpenModal(cls)} className="text-blue-500 hover:text-blue-700 mr-3"><FaEdit /></button>
                    <button onClick={() => handleDelete(cls._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
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
                {editing ? 'Edit Class' : 'Add Class'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Class Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                    {['Yoga','Strength Training','Cardio','CrossFit','Zumba','HIIT','Pilates','Aerobics','Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Trainer *</label>
                <select name="trainer" value={formData.trainer} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                  <option value="">Select Trainer</option>
                  {trainers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                </select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                  <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                  <option value="upcoming">Upcoming</option><option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                </select></div>
              <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'} Class</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;