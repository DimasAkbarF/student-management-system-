/**
 * User Model Class
 * Implements OOP principles for user authentication
 */

import { RegexPatterns } from '@/utils/regex';
import { hashPassword } from '@/utils/hash';

export interface IUser {
    id: number;
    username: string;
    password: string; // Stored as hash
    createdAt?: string;
    lastLogin?: string;
}

export class User {
    // Private fields
    #id: number;
    #username: string;
    #passwordHash: string;
    #createdAt: string;
    #lastLogin: string | null;

    constructor(data: IUser) {
        this.#id = data.id;
        this.#username = data.username;
        this.#passwordHash = data.password;
        this.#createdAt = data.createdAt || new Date().toISOString();
        this.#lastLogin = data.lastLogin || null;

        // Validate username on construction
        this.validateUsername();
    }

    // ===== GETTERS =====
    get id(): number {
        return this.#id;
    }

    get username(): string {
        return this.#username;
    }

    get passwordHash(): string {
        return this.#passwordHash;
    }

    get createdAt(): string {
        return this.#createdAt;
    }

    get lastLogin(): string | null {
        return this.#lastLogin;
    }

    // ===== SETTERS =====
    set username(value: string) {
        if (!RegexPatterns.username.test(value)) {
            throw new UserValidationError('Username must be 3-30 alphanumeric characters');
        }
        this.#username = value;
    }

    /**
     * Set password (will be hashed)
     */
    setPassword(plainPassword: string): void {
        if (!RegexPatterns.password.test(plainPassword)) {
            throw new UserValidationError('Password must be at least 6 characters');
        }
        this.#passwordHash = hashPassword(plainPassword);
    }

    // ===== METHODS =====

    /**
     * Validate username
     */
    validateUsername(): void {
        if (!RegexPatterns.username.test(this.#username)) {
            throw new UserValidationError('Username must be 3-30 alphanumeric characters');
        }
    }

    /**
     * Update last login timestamp
     */
    updateLastLogin(): void {
        this.#lastLogin = new Date().toISOString();
    }

    /**
     * Convert to JSON (excludes password for security)
     */
    toJSON(): Omit<IUser, 'password'> & { password?: string } {
        return {
            id: this.#id,
            username: this.#username,
            createdAt: this.#createdAt,
            lastLogin: this.#lastLogin || undefined
        };
    }

    /**
     * Convert to JSON with password (for storage)
     */
    toJSONWithPassword(): IUser {
        return {
            id: this.#id,
            username: this.#username,
            password: this.#passwordHash,
            createdAt: this.#createdAt,
            lastLogin: this.#lastLogin || undefined
        };
    }

    /**
     * Create User from JSON data
     */
    static fromJSON(data: IUser): User {
        return new User(data);
    }

    /**
     * Create a new user with hashed password
     */
    static create(id: number, username: string, plainPassword: string): User {
        // Validate password
        if (!RegexPatterns.password.test(plainPassword)) {
            throw new UserValidationError('Password must be at least 6 characters');
        }

        return new User({
            id,
            username,
            password: hashPassword(plainPassword),
            createdAt: new Date().toISOString()
        });
    }

    /**
     * String representation
     */
    toString(): string {
        return `User { ID: ${this.#id}, Username: ${this.#username} }`;
    }
}

/**
 * Custom User Validation Error
 */
export class UserValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserValidationError';
    }
}

export default User;
