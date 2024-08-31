"use client"; // Required for client-side components

import React, { useState } from 'react';

const SignupPage = () => {
  // State variables to store form input values
  // The idea to use const [signFirstName, setSignFirstName] = useState(''); came from https://www.youtube.com/watch?v=WYHQP9lQgD8&t=1187s, which I modified to fit the spec
  const [signFirstName, setSignFirstName] = useState('');
  const [signLastName, setSignLastName] = useState('');
  const [signUsername, setSignUsername] = useState('');
  const [signPassword, setSignPassword] = useState('');

  // Function to handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh on form submission

    try {
      // Sends a POST request to the signup API endpoint with form data
      //i learned how fetch worked via https://nextjs.org/docs/app/api-reference/functions/fetch
      const response = await fetch('/api/mysql/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: signFirstName,
          last_name: signLastName,
          username: signUsername,
          password: signPassword, 
        }),
      });

      const data = await response.json(); // Parses the JSON response from the server

      if (response.ok) {
        // Handle successful signup (e.g., redirect to the home page or show a success message)
        console.log('User registered successfully:', data);
      } else {
        // Handle error response (e.g., show error message to the user)
        console.error('Error registering user:', data);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Sign Up for Scair
        </h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignFirstName(e.target.value)} // Updates signFirstName state on input change
            value={signFirstName} // Binds the input value to signFirstName state
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignLastName(e.target.value)} // Updates signLastName state on input change
            value={signLastName} // Binds the input value to signLastName state
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignUsername(e.target.value)} // Updates signUsername state on input change
            value={signUsername} // Binds the input value to signUsername state
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-md text-black"
            onChange={e => setSignPassword(e.target.value)} // Updates signPassword state on input change
            value={signPassword} // Binds the input value to signPassword state
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
