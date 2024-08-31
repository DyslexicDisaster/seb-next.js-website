"use client"; // Ensures the component is rendered on the client-side

import React, { useState } from 'react';
// Learned how the useRouter hook works via https://nextjs.org/docs/app/building-your-application/routing/redirecting
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  // State variables to manage input fields
  const [signFirstName, setSignFirstName] = useState('');
  const [signLastName, setSignLastName] = useState('');
  const [signUsername, setSignUsername] = useState('');
  const [signPassword, setSignPassword] = useState('');

  // useRouter hook to programmatically navigate to different pages
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission behavior

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
      // Redirect to the home page after successful signup
      router.push('/'); // Uses the useRouter hook to navigate to the home page
    } else {
      // Log an error if signup fails
      console.error('Signup failed');
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
            onChange={e => setSignFirstName(e.target.value)} // Updates the state as the user types
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignLastName(e.target.value)} // Updates the state as the user types
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignUsername(e.target.value)} // Updates the state as the user types
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignPassword(e.target.value)} // Updates the state as the user types
          />
          <button
            type="submit" // Submits the form data when clicked
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
