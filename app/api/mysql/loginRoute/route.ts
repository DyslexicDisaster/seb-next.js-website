// Import the necessary modules
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt'; // Import bcrypt for password comparison
import { GetDBSettings, IDBSettings } from '@/sharedCode/common';

// Populate the connection parameters
let connectionParams: IDBSettings = GetDBSettings();

// Define and export the POST handler function for user login
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to retrieve login details
    const { username, password } = await request.json();

    // Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // Create a query to retrieve the user's hashed password from the database
    const query = "SELECT id, password FROM users WHERE username = ?";
    const [rows] = await connection.execute(query, [username]);

    // Close the connection
    connection.end();

    if (rows.length === 0) {
      // If no user is found with the given username, return an error
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the password is incorrect, return an error
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // If login is successful, return a success response
    return NextResponse.json({ message: 'Login successful!', userId: user.id });

  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
