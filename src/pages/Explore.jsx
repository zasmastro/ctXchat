import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Explore = () => {
  const explorePosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', likes: 1234 },
    { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', likes: 892 },
    { id: 3, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', likes: 2156 },
    { id: 4, image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', likes: 567 },
    { id: 5, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', likes: 3421 },
    { id: 6, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', likes: 1890 },
    { id: 7, image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400', likes: 945 },
    { id: 8, image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400', likes: 2678 },
    { id: 9, image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400', likes: 1567 },
  ];

  return (
    <>
      <Helmet>
        <title>Explore - InstaClone</title>
        <meta name="description" content="Discover new content and trending posts on InstaClone" />
      </Helmet>
      <div className="p-1">
        <div className="grid grid-cols-3 gap-1">
          {explorePosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square group cursor-pointer overflow-hidden"
            >
              <img
                src={post.image}
                alt="Explore post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-white">
                  <Heart className="w-6 h-6 fill-white" />
                  <span className="font-semibold">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;