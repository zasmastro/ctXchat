import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import CommentSection from '@/components/CommentSection';

const Post = ({ post }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const postDate = new Date(post.createdAt);
      const now = new Date();
      const seconds = Math.floor((now - postDate) / 1000);

      let interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return "Just now";
    };

    setTimeAgo(calculateTimeAgo());
  }, [post.createdAt]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <article className="bg-black border-b border-gray-800">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${post.username}`} className="flex items-center space-x-3">
          <img src={post.avatar} alt={post.username} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold hover:text-gray-300 transition-colors">{post.username}</p>
            <p className="text-xs text-gray-400">{post.location || 'Unknown location'}</p>
          </div>
        </Link>
        <button className="hover:text-gray-300 transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square bg-gray-900">
        <img src={post.image} alt={post.caption || "Post image"} className="w-full h-full object-cover" />
      </div>

      {/* Post Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="hover:text-gray-300 transition-colors"
            >
              <Heart className={`w-7 h-7 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </motion.button>
            <button onClick={() => setShowComments(!showComments)} className="hover:text-gray-300 transition-colors">
              <MessageCircle className="w-7 h-7" />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <Send className="w-7 h-7" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            className="hover:text-gray-300 transition-colors"
          >
            <Bookmark className={`w-6 h-6 ${saved ? 'fill-white' : ''}`} />
          </motion.button>
        </div>

        {/* Likes Count */}
        <p className="font-semibold">{likes.toLocaleString()} likes</p>

        {/* Caption */}
        {post.caption && (
          <div>
            <Link to={`/profile/${post.username}`} className="font-semibold hover:text-gray-300 mr-2">
              {post.username}
            </Link>
            <span className="text-gray-200">{post.caption}</span>
          </div>
        )}

        {/* View Comments */}
        {post.comments > 0 && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            View all {post.comments} comments
          </button>
        )}

        {/* Time */}
        <p className="text-xs text-gray-400 uppercase">{timeAgo}</p>
      </div>

      {/* Comments Section */}
      {showComments && <CommentSection postId={post.id} />}
    </article>
  );
};

export default Post;