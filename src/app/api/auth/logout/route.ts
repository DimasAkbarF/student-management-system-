import { NextResponse } from 'next/server';
import { authService } from '@/services/AuthService';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (token) {
            authService.logout(token);
        }

        cookieStore.delete('session_token');

        return NextResponse.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Logout failed' },
            { status: 500 }
        );
    }
}
