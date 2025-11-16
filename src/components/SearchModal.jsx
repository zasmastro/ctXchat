import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const allUsers = [
    { id: 1, username: 'johndoe', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe' },
    { id: 2, username: 'janesmit', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=janesmit' },
    { id: 3, username: 'mikebrown', name: 'Mike Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mikebrown' },
    { id: 4, username: 'sarahjones', name: 'Sarah Jones', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahjones' },
  ];

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim()) {
      const filtered = allUsers.filter(user =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-3 outline-none focus:border-gray-600"
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {results.length > 0 ? (
              results.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-sm text-gray-400">{user.name}</p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : query ? (
              <p className="text-center text-gray-400 py-8">No results found</p>
            ) : (
              <p className="text-center text-gray-400 py-8">Search for users</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;