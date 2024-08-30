import React from 'react';

const LoginPage = () => {
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
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-md"
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
