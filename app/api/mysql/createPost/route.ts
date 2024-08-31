import mysql from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';

// Function to get database settings
import { GetDBSettings } from '@/sharedCode/common';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Error' });
  }

  try {
    // Extract data from the request body
    const { content, userId } = req.body;

    // Get database connection parameters
    const connectionParams = GetDBSettings();

    // Create a connection to the database
    const connection = await mysql.createConnection(connectionParams);

    // SQL query to insert a new post 
    const query = 'INSERT INTO posts (content, user_id) VALUES (?, ?)';
    const [result] = await connection.execute(query, [content, userId]);

    // Close the connection
    connection.end();

    // Return the ID of the newly created post
    res.status(201).json({
      message: 'Post created successfully',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Failed to create post:', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
}
