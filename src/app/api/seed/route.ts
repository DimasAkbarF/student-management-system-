import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/lib/models/Student';
import User from '@/lib/models/User';

// Initial student data
const initialStudents = [
    { nim: "242011402104", name: "Yehezkiel Paskah", department: "Teknik Informatika", age: 20, gpa: 3.42 },
    { nim: "241011402315", name: "Fazri", department: "Teknik Informatika", age: 19, gpa: 2.91 },
    { nim: "241011400248", name: "Dimas Akbar F", department: "Teknik Informatika", age: 21, gpa: 3.77 },
    { nim: "241011401769", name: "Sulthan Arya Satwika", department: "Teknik Informatika", age: 18, gpa: 3.12 },
    { nim: "241011400253", name: "Syahrul Khairul Aqbar", department: "Teknik Informatika", age: 22, gpa: 2.85 },
    { nim: "241011400233", name: "Firman Gani", department: "Teknik Informatika", age: 19, gpa: 3.08 },
    { nim: "241011400232", name: "Rido Maulidan", department: "Teknik Informatika", age: 21, gpa: 3.51 },
    { nim: "241011400269", name: "Gilang Novrizal", department: "Teknik Informatika", age: 18, gpa: 3.02 },
    { nim: "241011400256", name: "M Raka Nuridwan", department: "Teknik Informatika", age: 20, gpa: 3.74 },
    { nim: "241011401525", name: "Muhammad Jiwa Islamutidar", department: "Teknik Informatika", age: 22, gpa: 3.33 },
    { nim: "241011400235", name: "Muhammad Ichsan Fachrulrozi", department: "Teknik Informatika", age: 17, gpa: 2.88 },
    { nim: "241011400228", name: "Adrian Mulya Akbar", department: "Teknik Informatika", age: 21, gpa: 3.69 },
    { nim: "241011400261", name: "Muzayin Arifin", department: "Teknik Informatika", age: 18, gpa: 3.14 },
    { nim: "241011400276", name: "Maikel Ade Vahrozi", department: "Teknik Informatika", age: 19, gpa: 3.91 },
    { nim: "241011402026", name: "Cristian Yuda", department: "Teknik Informatika", age: 20, gpa: 3.27 },
    { nim: "241011403270", name: "Faya Nur Ridho", department: "Teknik Informatika", age: 22, gpa: 2.93 },
    { nim: "241011401526", name: "Alfrendo Suranta", department: "Teknik Informatika", age: 19, gpa: 3.48 },
    { nim: "241011402051", name: "Afdal Laia", department: "Teknik Informatika", age: 21, gpa: 3.01 },
    { nim: "251011401655", name: "Ulya Khodilah", department: "Teknik Informatika", age: 17, gpa: 3.84 },
    { nim: "241011401528", name: "Fadly Himawan Saputra", department: "Teknik Informatika", age: 18, gpa: 2.76 },
    { nim: "241011400266", name: "Affan Dhiya Dil Awar", department: "Teknik Informatika", age: 22, gpa: 3.57 },
    { nim: "241011400277", name: "Bayu Abiakso", department: "Teknik Informatika", age: 20, gpa: 3.11 },
    { nim: "241011401536", name: "Medina Fikanti", department: "Teknik Informatika", age: 17, gpa: 3.66 },
    { nim: "241011401533", name: "Muhammad Zidan", department: "Teknik Informatika", age: 19, gpa: 3.22 },
    { nim: "241011402755", name: "Adlina Nailiyanti", department: "Teknik Informatika", age: 20, gpa: 3.40 },
    { nim: "241011400268", name: "Fariz Aditya Ardhana", department: "Teknik Informatika", age: 21, gpa: 3.06 },
    { nim: "241011400231", name: "M Fachrurozi", department: "Teknik Informatika", age: 18, gpa: 2.99 },
    { nim: "241011401936", name: "Timoty Tarunaselley", department: "Teknik Informatika", age: 20, gpa: 3.73 },
    { nim: "241011400254", name: "Stevania N Sading", department: "Teknik Informatika", age: 22, gpa: 3.67 },
    { nim: "241011402113", name: "Elisabeth Tes Lae", department: "Teknik Informatika", age: 17, gpa: 3.18 }
];

// Initial admin user
const initialUser = {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
};

// POST - Seed the database
export async function POST() {
    try {
        await connectDB();

        // Check if data already exists
        const studentCount = await Student.countDocuments();
        const userCount = await User.countDocuments();

        let studentsAdded = 0;
        let userAdded = false;

        // Seed students if empty
        if (studentCount === 0) {
            await Student.insertMany(initialStudents);
            studentsAdded = initialStudents.length;
        }

        // Seed user if empty
        if (userCount === 0) {
            await User.create(initialUser);
            userAdded = true;
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            data: {
                studentsAdded,
                userAdded,
                existingStudents: studentCount,
                existingUsers: userCount
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Seed failed';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

// GET - Check seed status
export async function GET() {
    try {
        await connectDB();

        const studentCount = await Student.countDocuments();
        const userCount = await User.countDocuments();

        return NextResponse.json({
            success: true,
            data: {
                students: studentCount,
                users: userCount,
                needsSeed: studentCount === 0 || userCount === 0
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Check failed';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
