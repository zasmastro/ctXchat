import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Settings, Grid, Bookmark, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const isOwnProfile = user?.username === username;

  const profileData = {
    username: username,
    name: username === user?.username ? (user?.name || user?.email) : username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    bio: 'Living my best life 🌟 | Travel enthusiast ✈️ | Photography lover 📸',
    posts: 42,
    followers: 1234,
    following: 567,
    website: 'www.example.com'
  };

  const userPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', likes: 1234 },
    { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', likes: 892 },
    { id: 3, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', likes: 2156 },
    { id: 4, image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', likes: 567 },
    { id: 5, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', likes: 3421 },
    { id: 6, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', likes: 1890 },
  ];

  return (
    <>
      <Helmet>
        <title>{profileData.username} - InstaClone</title>
        <meta name="description" content={`${profileData.username}'s profile on InstaClone`} />
      </Helmet>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            src={profileData.avatar}
            alt={profileData.username}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-800"
          />
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <h1 className="text-2xl font-light">{profileData.username}</h1>
              {isOwnProfile ? (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit Profile</Button>
                  <Button variant="outline" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Follow</Button>
                  <Button variant="outline" size="sm">Message</Button>
                </div>
              )}
            </div>

            <div className="flex justify-center md:justify-start space-x-8 mb-4">
              <div className="text-center">
                <span className="font-semibold">{profileData.posts}</span>
                <span className="text-gray-400 ml-1">posts</span>
              </div>
              <button className="text-center hover:text-gray-300">
                <span className="font-semibold">{profileData.followers.toLocaleString()}</span>
                <span className="text-gray-400 ml-1">followers</span>
              </button>
              <button className="text-center hover:text-gray-300">
                <span className="font-semibold">{profileData.following.toLocaleString()}</span>
                <span className="text-gray-400 ml-1">following</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="font-semibold">{profileData.name}</p>
              <p className="text-gray-300">{profileData.bio}</p>
              <a href={`https://${profileData.website}`} className="text-blue-500 hover:underline">
                {profileData.website}
              </a>
            </div>
          </div>
        </div>

        {/* Posts Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-center border-t border-gray-800 bg-transparent">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <Grid className="w-4 h-4" />
              <span className="hidden md:inline">POSTS</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline">SAVED</span>
            </TabsTrigger>
            <TabsTrigger value="tagged" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">TAGGED</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {userPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square group cursor-pointer overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt="Post"
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
          </TabsContent>

          <TabsContent value="saved" className="mt-4">
            <div className="text-center py-20">
              <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">Only you can see what you've saved</p>
            </div>
          </TabsContent>

          <TabsContent value="tagged" className="mt-4">
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No tagged posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;