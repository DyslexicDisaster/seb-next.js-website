"use client"; //got an error when using useState becasue they are automatically server comonants by defalt 

import React from 'react';
import { useState } from 'react';

const LoginPage = () => {

  const [ logUsername, setLogUsername ] = useState('');
  const [ logPassword, setLogPassword] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Login to Scair
        </h1>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded-md"
            onChange={e => setLogUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-md"
            onChange={e => setLogPassword(e.target.value)}
          />
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
