import mysql from 'mysql2/promise';
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const results = {
        message: "hello there"
    }
    return NextResponse.json(results);
}
