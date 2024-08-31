"use client"; // Required for client-side components

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FeedPage = () => {
  // State to store the list of posts fetched from the server
  const [posts, setPosts] = useState([]);
  
  // State to store the content of a new post being created
  const [newPostContent, setNewPostContent] = useState('');

  // useRouter hook to navigate between pages
  const router = useRouter();

  // useEffect hook to fetch posts 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the server API
        const postsResponse = await fetch('/api/mysql/posts');
        
        // If the response is successful, parse the JSON data and update the posts state
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          console.log(postsData);
          setPosts(postsData);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Redirect to login page if there is an error fetching posts
        router.push('/login');
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, [router]); // Dependency array includes router to ensure the hook is re-run when the router changes

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Redirect to the home page after logout
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Function to handle the creation of a new post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      // Send the new post data to the server API
      const response = await fetch('/api/mysql/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newPostContent, // Include the new post content in the request body
        }),
      });

      // If the post creation is successful, update the posts state to include the new post
      if (response.ok) {
        const newPost = await response.json();
        setPosts([newPost, ...posts]); // Add the new post to the top of the feed
        setNewPostContent(''); // Clear the input field after posting
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
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Feed Content */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold text-green-600 mb-8">Your Feed</h1>
        <div className="w-full max-w-2xl">
          {/* Map over the posts array and render each post */}
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
