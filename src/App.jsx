import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Feed from '@/pages/Feed';
import Profile from '@/pages/Profile';
import Explore from '@/pages/Explore';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/" element={<PrivateRoute><Layout><Feed /></Layout></PrivateRoute>} />
      <Route path="/explore" element={<PrivateRoute><Layout><Explore /></Layout></PrivateRoute>} />
      <Route path="/profile/:username" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>InstaClone - Share Your Moments</title>
        <meta name="description" content="A modern social media platform to share photos, connect with friends, and explore amazing content." />
      </Helmet>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;