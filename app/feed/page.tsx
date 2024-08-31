"use client"; // Required for client-side components

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch('/api/mysql/posts');
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        router.push('/login');
      }
    };

    fetchPosts();
  }, [router]); 

  const handleLogout = async () => {
    try {
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/mysql/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newPostContent,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([newPost, ...posts]);
        setNewPostContent('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-green-600">
          Scair Feed
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
          >
            Followers
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Feed Content */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold text-green-600 mb-8">Your Feed</h1>
        <div className="w-full max-w-2xl">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{post.username}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800">{post.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts to display.</p>
          )}
        </div>
      </div>

      {/* Create Post Section */}
      <div className="flex flex-col items-center mt-8">
        <form onSubmit={handleCreatePost} className="w-full max-w-2xl mb-8">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full p-4 border rounded-md text-black"
            placeholder="What's on your mind?"
            rows={4}
          />
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedPage;
