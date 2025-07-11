import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`/users/${id}`);
        setUser(res.data);
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err) {
          setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch user');
        } else {
          setError('Failed to fetch user');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button className="mb-4 bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/dashboard')}>Back</button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : user ? (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="mb-2"><strong>Name:</strong> {user.name}</div>
          <div className="mb-2"><strong>Email:</strong> {user.email}</div>
          <div className="mb-2"><strong>Status:</strong> {user.status}</div>
          <div className="mb-2"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default UserDetails; 