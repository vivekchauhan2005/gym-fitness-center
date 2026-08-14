import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaTimes, FaEnvelope, FaPhone } from 'react-icons/fa';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await adminApi.get('/enquiries');
      console.log('Enquiries response:', response.data);
      setEnquiries(response.data.data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await adminApi.put(`/enquiries/${id}`, { status });
      toast.success('Status updated successfully');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await adminApi.delete(`/enquiries/${id}`);
        toast.success('Enquiry deleted successfully');
        fetchEnquiries();
      } catch (error) {
        toast.error('Failed to delete enquiry');
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Enquiries</h1>
        <p className="text-blue-500">Manage customer enquiries</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-blue-400">No enquiries found</td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-900">{enquiry.name}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{enquiry.subject}</td>
                    <td className="px-6 py-4 text-sm text-blue-700">{enquiry.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-none outline-none ${
                          enquiry.status === 'New' ? 'bg-yellow-100 text-yellow-700' :
                          enquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-700">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => setSelected(enquiry)} className="text-blue-500 hover:text-blue-700 mr-3"><FaEye /></button>
                      <button onClick={() => handleDelete(enquiry._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">Enquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700"><FaTimes size={24} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500">Name</p><p className="font-semibold text-blue-900">{selected.name}</p></div>
                <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500">Subject</p><p className="font-semibold text-blue-900">{selected.subject}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500 flex items-center gap-2"><FaEnvelope /> Email</p><p className="font-semibold text-blue-900">{selected.email}</p></div>
                <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500 flex items-center gap-2"><FaPhone /> Phone</p><p className="font-semibold text-blue-900">{selected.phone}</p></div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500">Message</p><p className="text-blue-800">{selected.message}</p></div>
              <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500">Status</p><span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                selected.status === 'New' ? 'bg-yellow-100 text-yellow-700' :
                selected.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>{selected.status}</span></div>
              <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-500">Date</p><p className="text-blue-800">{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;