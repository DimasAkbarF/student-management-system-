import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/lib/models/Student';

// GET all students
export async function GET() {
    try {
        await connectDB();
        const students = await Student.find({}).sort({ createdAt: -1 });

        // Convert MongoDB documents to plain objects with id field
        const data = students.map(s => ({
            id: s._id.toString(),
            nim: s.nim,
            name: s.name,
            department: s.department,
            age: s.age,
            gpa: s.gpa,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt
        }));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch students';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

// POST create new student
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();

        // Check if NIM already exists
        const existing = await Student.findOne({ nim: body.nim });
        if (existing) {
            return NextResponse.json(
                { success: false, error: 'Student with this NIM already exists' },
                { status: 409 }
            );
        }

        const student = await Student.create(body);

        const data = {
            id: student._id.toString(),
            nim: student.nim,
            name: student.name,
            department: student.department,
            age: student.age,
            gpa: student.gpa,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt
        };

        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create student';
        return NextResponse.json({ success: false, error: message }, { status: 400 });
    }
}
