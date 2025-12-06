import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Find user
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return NextResponse.json(
                { success: false, error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        // Create simple token (in production, use JWT)
        const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/'
        });

        return NextResponse.json({
            success: true,
            data: {
                user: {
                    username: user.username,
                    role: user.role
                }
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed';
        return NextResponse.json(
            { success: false, error: message },
            { status: 401 }
        );
    }
}
