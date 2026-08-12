import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/api/users');
      setCustomers(response.data.data);
    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="loading-spinner"></div></div>;

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-secondary mb-6">Customers</h2>

      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-secondary">{customer.name}</td>
                  <td className="px-6 py-4 text-sm">{customer.email}</td>
                  <td className="px-6 py-4 text-sm">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => setSelected(customer)} className="text-blue-500 hover:text-blue-700">
                      <FaUser />
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
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl font-bold text-secondary">Customer Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selected.name?.charAt(0)}
                </div>
              </div>
              <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selected.email}</p></div>
              <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selected.phone}</p></div>
              <div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize">{selected.role}</p></div>
              <div><p className="text-sm text-gray-500">Joined</p><p>{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;