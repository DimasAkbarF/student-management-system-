import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/lib/models/Student';

export async function GET() {
    try {
        await connectDB();

        const students = await Student.find({}).sort({ createdAt: -1 });

        // Format for export
        const exportData = students.map(s => ({
            nim: s.nim,
            name: s.name,
            department: s.department,
            age: s.age,
            gpa: s.gpa
        }));

        const date = new Date().toISOString().split('T')[0];
        const filename = `students-${date}.json`;

        return new NextResponse(JSON.stringify(exportData, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="${filename}"`
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Export failed';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
