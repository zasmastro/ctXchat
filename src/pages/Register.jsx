import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register({
      email,
      username,
      password,
      name: fullName
    });
    
    if (result.success) {
      toast({
        title: "Welcome to InstaClone!",
        description: "Your account has been created successfully"
      });
      navigate('/');
    } else {
      toast({
        title: "Registration failed",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - InstaClone</title>
        <meta name="description" content="Create your InstaClone account" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-4">
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              InstaClone
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Sign up to see photos and videos from your friends.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-gray-600"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-gray-600"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-gray-600"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-gray-600"
                />
              </div>

              <p className="text-xs text-gray-400 text-center">
                By signing up, you agree to our Terms, Data Policy and Cookies Policy.
              </p>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </form>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">
              Have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;