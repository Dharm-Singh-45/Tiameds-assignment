import React, { useEffect, useState } from 'react';
import axios from '../services/axios'; 
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const navigate = useNavigate();
  const [limit] = useState(5); 

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`/users?page=${page}&search=${search}&limit=${limit}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);   
      setTotal(res.data.total);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch users');
      } else {
        setError('Failed to fetch users');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page, search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeleteLoading(userId);
    setDeleteError('');
    try {
      await axios.delete(`/users/${userId}`);
      fetchUsers();
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        setDeleteError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to delete user');
      } else {
        setDeleteError('Failed to delete user');
      }
    }
    setDeleteLoading(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 rounded w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => navigate('/add-user')}
      >
        Add User
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <div></div>
            <div className="text-sm text-gray-600 font-semibold">Total Users: {total}</div>
          </div>
          <table className="min-w-full bg-white border rounded text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b align-middle">Sr No</th>
                <th className="py-2 px-4 border-b align-middle">Name</th>
                <th className="py-2 px-4 border-b align-middle">Email</th>
                <th className="py-2 px-4 border-b align-middle">Status</th>
                <th className="py-2 px-4 border-b align-middle">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                  <td className="py-2 px-4 border-b align-middle">{(page - 1) * limit + idx + 1}</td>
                  <td className="py-2 px-4 border-b align-middle">{user.name}</td>
                  <td className="py-2 px-4 border-b align-middle">{user.email}</td>
                  <td className="py-2 px-4 border-b align-middle">{user.status}</td>
                  <td className="py-2 px-4 border-b align-middle">
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => navigate(`/users/${user._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => navigate(`/edit-user/${user._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(user._id)}
                        disabled={deleteLoading === user._id}
                      >
                        {deleteLoading === user._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {deleteError && <div className="text-red-500 mt-2">{deleteError}</div>}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 