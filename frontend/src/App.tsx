import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import AddEditUser from './pages/AddEditUser';


const isLoggedIn = () => !!localStorage.getItem('token');

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users/:id"
          element={isLoggedIn() ? <UserDetails /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add-user"
          element={isLoggedIn() ? <AddEditUser /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-user/:id"
          element={isLoggedIn() ? <AddEditUser /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
