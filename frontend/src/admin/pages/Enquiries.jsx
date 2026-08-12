import React, { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await api.get('/api/enquiries');
      setEnquiries(response.data.data);
    } catch (error) {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/api/enquiries/${id}`, { status });
      toast.success('Status updated successfully');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await api.delete(`/api/enquiries/${id}`);
        toast.success('Enquiry deleted successfully');
        fetchEnquiries();
      } catch (error) {
        toast.error('Failed to delete enquiry');
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="loading-spinner"></div></div>;

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-secondary mb-6">Enquiries</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-secondary">{enquiry.name}</td>
                  <td className="px-6 py-4 text-sm">{enquiry.subject}</td>
                  <td className="px-6 py-4 text-sm">{enquiry.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold border-none ${
                        enquiry.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                        enquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => setSelected(enquiry)} className="text-blue-500 hover:text-blue-700 mr-3">
                      <FaEye />
                    </button>
                    <button onClick={() => handleDelete(enquiry._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl font-bold text-secondary">Enquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selected.email}</p></div>
              <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selected.phone}</p></div>
              <div><p className="text-sm text-gray-500">Subject</p><p className="font-medium">{selected.subject}</p></div>
              <div><p className="text-sm text-gray-500">Message</p><p className="text-gray-700">{selected.message}</p></div>
              <div><p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  selected.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                  selected.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>{selected.status}</span></div>
              <div><p className="text-sm text-gray-500">Date</p><p>{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;