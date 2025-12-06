import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/lib/models/Student';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { data, replace = false } = await request.json();

        // Validate data is an array
        if (!Array.isArray(data) || data.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Invalid data format. Expected array of students.' },
                { status: 400 }
            );
        }

        // If replace mode, delete all existing students first
        if (replace) {
            await Student.deleteMany({});
        }

        // Prepare students for insertion
        const studentsToInsert = data.map(s => ({
            nim: s.nim,
            name: s.name || s.fullName, // Support both formats
            department: s.department,
            age: s.age,
            gpa: s.gpa
        }));

        // Insert students, skip duplicates
        let imported = 0;
        for (const student of studentsToInsert) {
            try {
                const exists = await Student.findOne({ nim: student.nim });
                if (!exists) {
                    await Student.create(student);
                    imported++;
                }
            } catch {
                // Skip invalid students
                continue;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully imported ${imported} students`,
            data: { imported }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Import failed';
        return NextResponse.json({ success: false, error: message }, { status: 400 });
    }
}
