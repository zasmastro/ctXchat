import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch comments for postId here.
    // For now, we just start with an empty array.
    setComments([]);
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      username: user.username,
      avatar: user.avatar,
      text: comment,
      likes: 0,
      timeAgo: 'Just now'
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="border-t border-gray-800">
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {comments.length > 0 ? comments.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-3"
          >
            <img src={c.avatar} alt={c.username} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-semibold text-sm mr-2">{c.username}</span>
                  <span className="text-sm">{c.text}</span>
                </div>
                <button className="hover:text-gray-300">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                <span>{c.timeAgo}</span>
                {c.likes > 0 && <span>{c.likes} likes</span>}
                <button className="hover:text-gray-300">Reply</button>
              </div>
            </div>
          </motion.div>
        )) : (
          <p className="text-center text-gray-400 py-4">No comments yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 flex items-center space-x-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent outline-none"
        />
        <Button
          type="submit"
          variant="ghost"
          disabled={!comment.trim()}
          className="text-blue-500 hover:text-blue-400 disabled:text-gray-600"
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;