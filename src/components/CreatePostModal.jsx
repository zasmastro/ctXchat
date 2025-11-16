import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const CreatePostModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = () => {
    // Using a placeholder image from unsplash. In a real app this would open a file picker.
    const randomImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    ];
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    setImagePreview(randomImage);
  };

  const resetForm = () => {
    setCaption('');
    setLocation('');
    setImagePreview(null);
  }

  const handleClose = () => {
    resetForm();
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imagePreview) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive"
      });
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
      id: Date.now().toString(),
      username: user.username,
      avatar: user.avatar,
      image: imagePreview,
      caption,
      location,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    toast({
      title: "Success!",
      description: "Your post has been created."
    });

    handleClose();
    // Use a more React-friendly way to update the feed if possible,
    // but for now this ensures the new post is visible.
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!imagePreview ? (
            <div
              onClick={handleImageSelect}
              className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-gray-600 transition-colors"
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Click to select a photo</p>
              <p className="text-xs text-gray-500 mt-1">(This will select a random image for demo purposes)</p>
            </div>
          ) : (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full rounded-lg aspect-square object-cover" />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 outline-none focus:border-gray-600 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 outline-none focus:border-gray-600"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Share
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;