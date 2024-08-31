import { NextResponse, NextRequest } from 'next/server';

import mysql from 'mysql2/promise';

import { GetDBSettings, IDBSettings } from '@/sharedCode/common';

let connectionParams: IDBSettings = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    const [rows] = await connection.execute(`
      SELECT posts.id, posts.content, posts.timestamp, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.timestamp DESC
    `);

    connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}
