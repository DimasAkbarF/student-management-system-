import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/lib/models/Student';

// GET single student
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const studentDoc = await Student.findById(id).lean();
        if (!studentDoc) {
            return NextResponse.json(
                { success: false, error: 'Student not found' },
                { status: 404 }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const student = studentDoc as any;
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

        return NextResponse.json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Student not found';
        return NextResponse.json({ success: false, error: message }, { status: 404 });
    }
}

// PUT update student
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const studentDoc = await Student.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).lean();

        if (!studentDoc) {
            return NextResponse.json(
                { success: false, error: 'Student not found' },
                { status: 404 }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const student = studentDoc as any;
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

        return NextResponse.json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update student';
        const status = message.includes('not found') ? 404 : 400;
        return NextResponse.json({ success: false, error: message }, { status });
    }
}

// DELETE student
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return NextResponse.json(
                { success: false, error: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete student';
        return NextResponse.json({ success: false, error: message }, { status: 404 });
    }
}
