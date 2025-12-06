/**
 * User MongoDB Schema
 * Simple schema for user authentication
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for User document
export interface IUserDocument extends Document {
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

// User Schema
const UserSchema = new Schema<IUserDocument>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            minlength: [3, 'Username must be at least 3 characters'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [4, 'Password must be at least 4 characters'],
        },
        role: {
            type: String,
            default: 'admin',
            enum: ['admin', 'user'],
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUserDocument> =
    mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export default User;
