import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import SearchModal from '@/components/SearchModal';
import CreatePostModal from '@/components/CreatePostModal';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              InstaClone
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-gray-300 transition-colors">
                <Home className="w-6 h-6" />
              </Link>
              <button onClick={() => setShowSearch(true)} className="hover:text-gray-300 transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <Link to="/explore" className="hover:text-gray-300 transition-colors">
                <Heart className="w-6 h-6" />
              </Link>
              <button onClick={() => setShowCreatePost(true)} className="hover:text-gray-300 transition-colors">
                <PlusSquare className="w-6 h-6" />
              </button>
              <Link to={`/profile/${user?.username}`} className="hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-gray-800 overflow-hidden"
              >
                <div className="py-4 space-y-4">
                  <Link to="/" className="flex items-center space-x-3 hover:bg-gray-900 p-2 rounded-lg transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                  <button onClick={() => { setShowSearch(true); setMobileMenuOpen(false); }} className="flex items-center space-x-3 hover:bg-gray-900 p-2 rounded-lg transition-colors w-full">
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                  <Link to="/explore" className="flex items-center space-x-3 hover:bg-gray-900 p-2 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Explore</span>
                  </Link>
                  <button onClick={() => { setShowCreatePost(true); setMobileMenuOpen(false); }} className="flex items-center space-x-3 hover:bg-gray-900 p-2 rounded-lg transition-colors w-full">
                    <PlusSquare className="w-5 h-5" />
                    <span>Create</span>
                  </button>
                  <Link to={`/profile/${user?.username}`} className="flex items-center space-x-3 hover:bg-gray-900 p-2 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center space-x-3 hover:bg-gray-900 p-2 rounded-lg transition-colors w-full text-red-500">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <SearchModal open={showSearch} onClose={() => setShowSearch(false)} />
      <CreatePostModal open={showCreatePost} onClose={() => setShowCreatePost(false)} />
    </>
  );
};

export default Navbar;