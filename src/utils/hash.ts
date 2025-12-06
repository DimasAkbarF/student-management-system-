/**
 * Password Hashing Utilities
 * Uses SHA-256 for password hashing
 */

import crypto from 'crypto';

/**
 * Hash a password using SHA-256
 * @param password - The plain text password
 * @returns The hashed password
 */
export function hashPassword(password: string): string {
    const salt = 'student_management_salt_2024';
    return crypto
        .createHash('sha256')
        .update(password + salt)
        .digest('hex');
}

/**
 * Compare a plain text password with a hashed password
 * @param password - The plain text password
 * @param hashedPassword - The hashed password to compare against
 * @returns True if passwords match
 */
export function comparePassword(password: string, hashedPassword: string): boolean {
    const hash = hashPassword(password);
    return hash === hashedPassword;
}

/**
 * Generate a random session token
 * @returns A random 64-character hex string
 */
export function generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate a unique ID
 * @returns A random UUID-like string
 */
export function generateId(): string {
    return crypto.randomBytes(16).toString('hex');
}

export default {
    hashPassword,
    comparePassword,
    generateSessionToken,
    generateId
};
