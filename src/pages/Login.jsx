import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in"
      });
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive"
      });
    }
  };
  return <>
      <Helmet>
        <title>Login - InstaClone</title>
        <meta name="description" content="Login to your InstaClone account" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-4">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Ctx-chat</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-gray-600" />
              </div>
              
              <div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-gray-600" />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Log In
              </Button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            <button className="w-full text-blue-500 hover:text-blue-400 text-sm font-semibold">
              Forgot password?
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-400 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>;
};
export default Login;