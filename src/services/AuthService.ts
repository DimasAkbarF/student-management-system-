/**
 * Auth Service
 * Handles authentication, sessions, and password management
 */

import { BaseService } from './BaseService';
import { IUser } from '@/models/User';
import { hashPassword, comparePassword, generateSessionToken } from '@/utils/hash';
import { AuthenticationError, ValidationError } from './ErrorHandler';
import { validationService } from './ValidationService';

interface Session {
    token: string;
    userId: number;
    username: string;
    expiresAt: string;
}

export class AuthService extends BaseService<IUser> {
    private static instance: AuthService;
    private sessions: Map<string, Session> = new Map();
    private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    private constructor() {
        super('users.json');
        this.initializeDefaultUser();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private initializeDefaultUser(): void {
        const users = this.read();
        if (users.length === 0) {
            const defaultUser: IUser = {
                id: 1,
                username: 'admin',
                password: hashPassword('admin123'),
                createdAt: new Date().toISOString()
            };
            this.write([defaultUser]);
        }
    }

    validate(data: Partial<IUser>): void {
        const result = validationService.validateUser({
            username: data.username,
            password: data.password
        });
        if (!result.valid) {
            throw new ValidationError('Invalid credentials', result.errors);
        }
    }

    login(username: string, password: string): { token: string; user: Omit<IUser, 'password'> } {
        const users = this.read();
        const user = users.find(u => u.username === username);

        if (!user) {
            throw new AuthenticationError('Invalid username or password');
        }

        if (!comparePassword(password, user.password)) {
            throw new AuthenticationError('Invalid username or password');
        }

        const token = generateSessionToken();
        const session: Session = {
            token,
            userId: user.id,
            username: user.username,
            expiresAt: new Date(Date.now() + this.SESSION_DURATION).toISOString()
        };
        this.sessions.set(token, session);

        return {
            token,
            user: { id: user.id, username: user.username, createdAt: user.createdAt }
        };
    }

    logout(token: string): void {
        this.sessions.delete(token);
    }

    verifySession(token: string): Session | null {
        const session = this.sessions.get(token);
        if (!session) return null;
        if (new Date(session.expiresAt) < new Date()) {
            this.sessions.delete(token);
            return null;
        }
        return session;
    }

    getUserById(id: number): Omit<IUser, 'password'> | null {
        const users = this.read();
        const user = users.find(u => u.id === id);
        if (!user) return null;
        return { id: user.id, username: user.username, createdAt: user.createdAt };
    }

    hashPasswordUtil(password: string): string {
        return hashPassword(password);
    }

    comparePasswordUtil(password: string, hash: string): boolean {
        return comparePassword(password, hash);
    }
}

export const authService = AuthService.getInstance();
export default AuthService;
