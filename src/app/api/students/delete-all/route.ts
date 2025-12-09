/**
 * API Route: Delete All Students
 * DELETE /api/students/delete-all
 * Deletes all students from the database
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StudentModel from '@/lib/models/Student';

export async function DELETE() {
    try {
        await connectDB();

        const result = await StudentModel.deleteMany({});

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} students`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('Delete all students error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete all students' },
            { status: 500 }
        );
    }
}
