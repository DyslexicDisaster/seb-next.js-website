// app/page.tsx

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">
          Welcome to Scair
        </h1>
        <p className="text-center text-green-700 mb-6">
          Scair is your new social media platform. Connecting people from as far as the lighthouses of Fanad Head to the heart of Dublin city. Join the crowd today!
        </p>
        <div className="flex justify-around">
          <Link href="/login">
            <div className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
              Login
            </div>
          </Link>
          <Link href="/signup">
            <div className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500 cursor-pointer">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
