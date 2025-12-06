/**
 * MongoDB Database Connection
 * Simple and efficient connection handling for Next.js
 */

import mongoose from 'mongoose';

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your .env.local file');
}

/**
 * Global cache for mongoose connection
 * This prevents multiple connections in development (hot reload)
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Connect to MongoDB
 * Uses connection caching to prevent too many connections
 */
export async function connectDB(): Promise<typeof mongoose> {
    // Return cached connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // Create new connection if no promise exists
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ Connected to MongoDB');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
