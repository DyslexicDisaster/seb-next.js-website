//Most of this code is based from the artical listed on moodle https://blog.stackademic.com/next-js-api-connect-to-mysql-database-73619c1d88cd
// by Badih Barakat called Next.js API: Connect to MySQL Database

// import the Request and Response classes
import { NextResponse, NextRequest } from "next/server";

// import mysql2/promise for mysql connectivity
import mysql from 'mysql2/promise';

// import bcrypt from 'bcrypt to hash password';
import bcrypt from 'bcrypt';

// import GetDBSettings to retrieve the database connection environment parameters,
// and the IDBSettings object interface
import { GetDBSettings, IDBSettings } from '@/sharedCode/common';

// populate the connection parameters
let connectionParams: IDBSettings = GetDBSettings();

// define and export the POST handler function for user signup
export async function POST(request: NextRequest) {
    try {
        // parse the request body to retrieve the signup details
        const { first_name, last_name, username, password } = await request.json();

        // Hash the password using bcrypt
        const saltRounds = 10; // 10 salt rounds is typically used for the best balance of security and cost
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        // connect to the database
        const connection = await mysql.createConnection(connectionParams);

        // create a query to insert the new user into the users table
        let insert_user_query = `
            INSERT INTO users (first_name, last_name, username, password)
            VALUES (?, ?, ?, ?)
        `;

        // prepare values for the SQL query
        let values: any[] = [first_name, last_name, username, hashedPassword];  // Note: The password is hashed before storing

        // execute the query to insert the new user
        const [result] = await connection.execute(insert_user_query, values);

        // close the connection when done
        connection.end();

        // return a success response
        return NextResponse.json({ message: 'User registered successfully!', userId: result.insertId });
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);

        const response = {
            error: (err as Error).message,
            returnedStatus: 500,
        }

        return NextResponse.json(response, { status: 500 });
    }
}
