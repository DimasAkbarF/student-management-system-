import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/lib/models/Student';

export async function GET() {
    try {
        await connectDB();

        // Get total count
        const total = await Student.countDocuments();

        // Get average GPA
        const gpaResult = await Student.aggregate([
            { $group: { _id: null, avgGpa: { $avg: '$gpa' } } }
        ]);
        const avgGpa = gpaResult.length > 0 ? gpaResult[0].avgGpa : 0;

        // Get unique departments
        const departments = await Student.distinct('department');

        return NextResponse.json({
            success: true,
            data: {
                total,
                avgGpa: Math.round(avgGpa * 100) / 100,
                departments
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to get stats';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
