import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x border-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;