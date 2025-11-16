import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const suggestions = [
    { id: 1, username: 'johndoe', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe' },
    { id: 2, username: 'janesmit', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=janesmit' },
    { id: 3, username: 'mikebrown', name: 'Mike Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mikebrown' },
  ];

  return (
    <aside className="hidden lg:block w-80 p-6 sticky top-16 h-screen overflow-y-auto">
      <div className="mb-8">
        <Link to={`/profile/${user?.username}`} className="flex items-center space-x-3 hover:bg-gray-900 p-3 rounded-lg transition-colors">
          <img src={user?.avatar} alt={user?.username} className="w-12 h-12 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user?.username}</p>
            <p className="text-sm text-gray-400 truncate">{user?.name || user?.email}</p>
          </div>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 font-semibold">Suggestions For You</h3>
          <button className="text-sm text-white hover:text-gray-300">See All</button>
        </div>
        <div className="space-y-3">
          {suggestions.map(suggestion => (
            <div key={suggestion.id} className="flex items-center justify-between">
              <Link to={`/profile/${suggestion.username}`} className="flex items-center space-x-3 flex-1 min-w-0">
                <img src={suggestion.avatar} alt={suggestion.username} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{suggestion.username}</p>
                  <p className="text-xs text-gray-400 truncate">{suggestion.name}</p>
                </div>
              </Link>
              <button className="text-sm text-blue-500 hover:text-blue-400 font-semibold">Follow</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-500 space-y-2">
        <p>© 2025 InstaClone by Hostinger Horizons</p>
      </div>
    </aside>
  );
};

export default Sidebar;