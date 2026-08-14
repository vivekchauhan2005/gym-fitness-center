import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Yoga', trainer: '', date: '',
    startTime: '', endTime: '', capacity: '', description: '', status: 'upcoming'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classesRes, trainersRes] = await Promise.all([
        adminApi.get('/classes'),
        adminApi.get('/trainers')
      ]);
      console.log('Classes response:', classesRes.data);
      console.log('Trainers response:', trainersRes.data);
      setClasses(classesRes.data.data || []);
      setTrainers(trainersRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        await adminApi.put(`/classes/${editing}`, formData);
        toast.success('Class updated successfully');
      } else {
        await adminApi.post('/classes', formData);
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
        await adminApi.delete(`/classes/${id}`);
        toast.success('Class deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete class');
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
          <h1 className="text-3xl font-bold text-blue-900">Classes</h1>
          <p className="text-blue-500">Manage class schedules</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02] flex items-center gap-2">
          <FaPlus /> Add Class
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-blue-400">No classes found</td>
                </tr>
              ) : (
                classes.map((cls) => (
                  <tr key={cls._id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-900">{cls.name}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{cls.category}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{cls.trainer?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{new Date(cls.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cls.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                        cls.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                        cls.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {cls.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => handleOpenModal(cls)} className="text-blue-500 hover:text-blue-700 mr-3"><FaEdit /></button>
                      <button onClick={() => handleDelete(cls._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
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
              <h3 className="text-2xl font-bold text-blue-900">{editing ? 'Edit Class' : 'Add Class'}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700"><FaTimes size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Class Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Category *</label><select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  {['Yoga','Strength Training','Cardio','CrossFit','Zumba','HIIT','Pilates','Aerobics','Other'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select></div>
              </div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Trainer *</label><select name="trainer" value={formData.trainer} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option value="">Select Trainer</option>
                {trainers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select></div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Date *</label><input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-blue-700 mb-1">Start Time *</label><input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
                <div><label className="block text-sm font-medium text-blue-700 mb-1">End Time *</label><input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              </div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Capacity *</label><input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required min="1" className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></div>
              <div><label className="block text-sm font-medium text-blue-700 mb-1">Status</label><select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option value="upcoming">Upcoming</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
              </select></div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02]">
                {editing ? 'Update' : 'Create'} Class
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;