import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Post from '@/components/Post';
import { motion } from 'framer-motion';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  return (
    <>
      <Helmet>
        <title>Feed - InstaClone</title>
        <meta name="description" content="Explore the latest posts from people you follow on InstaClone" />
      </Helmet>
      <div className="max-w-2xl mx-auto">
        {posts.length > 0 ? posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Post post={post} />
          </motion.div>
        )) : (
          <div className="text-center py-20 px-4">
            <h2 className="text-2xl font-bold mb-2">Welcome to InstaClone!</h2>
            <p className="text-gray-400 text-lg">It's a bit empty here. Create your first post!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Feed;