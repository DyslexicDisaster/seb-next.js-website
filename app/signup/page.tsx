"use client"; // Ensures the component is rendered on the client-side

import React, { useState } from 'react';
//https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
//the above link help with understing linking and routing
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  // State variables to manage input fields
  const [signFirstName, setSignFirstName] = useState('');
  const [signLastName, setSignLastName] = useState('');
  const [signUsername, setSignUsername] = useState('');
  const [signPassword, setSignPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  // useRouter hook to programmatically navigate to different pages
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior which would normally reload the page

    // Send signup data to the API
    const response = await fetch('/api/mysql/users', {
      method: 'POST', // HTTP method for creating new resources
      headers: {
        'Content-Type': 'application/json', // Specifies the content type as JSON
      },
      body: JSON.stringify({
        first_name: signFirstName,
        last_name: signLastName,
        username: signUsername,
        password: signPassword, // Collects and sends the user input as JSON
      }),
    });

    if (response.ok) {
      // Display a success message and then redirect after a short delay
      setSuccessMessage('Signup successful! Redirecting...');
      setTimeout(() => {
        router.push('/'); // Uses the useRouter hook to navigate to the home page
      }, 2000); // Redirect after 2 seconds
    } else {
      // Log an error if signup fails
      console.error('Signup failed');
      setSuccessMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Sign Up for Scair
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
          {successMessage && (
            <div className="mt-4 text-center text-green-500">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
