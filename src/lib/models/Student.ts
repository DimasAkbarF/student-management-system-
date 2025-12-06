/**
 * Student MongoDB Schema
 * Simple schema for student data
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Student document
export interface IStudentDocument extends Document {
    nim: string;
    name: string;
    department: string;
    age: number;
    gpa: number;
    createdAt: Date;
    updatedAt: Date;
}

// Student Schema
const StudentSchema = new Schema<IStudentDocument>(
    {
        nim: {
            type: String,
            required: [true, 'NIM is required'],
            unique: true,
            match: [/^\d{10,12}$/, 'NIM must be 10-12 digits'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        department: {
            type: String,
            required: [true, 'Department is required'],
            minlength: [2, 'Department must be at least 2 characters'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [17, 'Age must be at least 17'],
            max: [60, 'Age cannot exceed 60'],
        },
        gpa: {
            type: Number,
            required: [true, 'GPA is required'],
            min: [0, 'GPA cannot be less than 0'],
            max: [4, 'GPA cannot exceed 4.00'],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Prevent model recompilation in development
const Student: Model<IStudentDocument> =
    mongoose.models.Student || mongoose.model<IStudentDocument>('Student', StudentSchema);

export default Student;
