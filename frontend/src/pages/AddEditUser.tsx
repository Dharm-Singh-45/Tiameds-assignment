import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/axios';

const AddEditUser = () => {
  const { id } = useParams<{ id?: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/users/${id}`)
        .then(res => {
          setName(res.data.name);
          setEmail(res.data.email);
          setStatus(res.data.status);
        })
        .catch(err => {
          setError('Failed to fetch user');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (id) {
        await axios.put(`/users/${id}`, { name, email, status, password: password || undefined });
        setSuccess('User updated successfully');
      } else {
        await axios.post('/users', { name, email, status, password });
        setSuccess('User added successfully');
      }
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to save user');
      } else {
        setError('Failed to save user');
      }
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button className="mb-4 bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/dashboard')}>Back</button>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{id ? 'Edit User' : 'Add User'}</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={!!id}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {/* Only show password field when adding a new user */}
        {!id && (
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (id ? 'Updating...' : 'Adding...') : (id ? 'Update User' : 'Add User')}
        </button>
      </form>
    </div>
  );
};

export default AddEditUser; 