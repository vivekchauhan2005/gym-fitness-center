import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await adminApi.get('/users');

      console.log('Members response:', response.data);

      if (response.data.success) {
        setMembers(response.data.data || []);
      } else {
        toast.error(response.data.message || 'Failed to load members');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      console.error('Status:', error.response?.status);
      console.error('Response:', error.response?.data);

      toast.error(
        error.response?.data?.message || 'Failed to load members'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(search.toLowerCase()) ||
    member.email?.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-blue-900">
          Members
        </h1>
        <p className="text-blue-500">
          Manage your gym members
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />

          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-50">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-blue-400"
                  >
                    No members found
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-blue-900">
                      {member.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-blue-700">
                      {member.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-blue-700">
                      {member.phone || '-'}
                    </td>

                    <td className="px-6 py-4 text-sm text-blue-700">
                      {member.createdAt
                        ? new Date(member.createdAt).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;