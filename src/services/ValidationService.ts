/**
 * Validation Service
 * Centralized validation logic with regex patterns
 */

import { RegexPatterns, ValidationMessages } from '@/utils/regex';
import { ValidationError } from './ErrorHandler';

export interface ValidationResult {
    valid: boolean;
    errors: Record<string, string>;
}

export class ValidationService {
    private static instance: ValidationService;

    private constructor() { }

    static getInstance(): ValidationService {
        if (!ValidationService.instance) {
            ValidationService.instance = new ValidationService();
        }
        return ValidationService.instance;
    }

    validateNim(nim: string): boolean {
        return RegexPatterns.nim.test(nim);
    }

    validateName(name: string): boolean {
        return RegexPatterns.name.test(name);
    }

    validateDepartment(department: string): boolean {
        return RegexPatterns.department.test(department);
    }

    validateAge(age: number | string): boolean {
        return RegexPatterns.age.test(age.toString());
    }

    validateGpa(gpa: number | string): boolean {
        const gpaNum = typeof gpa === 'string' ? parseFloat(gpa) : gpa;
        return gpaNum >= 0 && gpaNum <= 4;
    }

    validateUsername(username: string): boolean {
        return RegexPatterns.username.test(username);
    }

    validatePassword(password: string): boolean {
        return RegexPatterns.password.test(password);
    }

    validateStudent(data: {
        nim?: string;
        name?: string;
        department?: string;
        age?: number | string;
        gpa?: number | string;
    }): ValidationResult {
        const errors: Record<string, string> = {};

        if (data.nim !== undefined && !this.validateNim(data.nim)) {
            errors.nim = ValidationMessages.nim;
        }
        if (data.name !== undefined && !this.validateName(data.name)) {
            errors.name = ValidationMessages.name;
        }
        if (data.department !== undefined && !this.validateDepartment(data.department)) {
            errors.department = ValidationMessages.department;
        }
        if (data.age !== undefined && !this.validateAge(data.age)) {
            errors.age = ValidationMessages.age;
        }
        if (data.gpa !== undefined && !this.validateGpa(data.gpa)) {
            errors.gpa = ValidationMessages.gpa;
        }

        return { valid: Object.keys(errors).length === 0, errors };
    }

    validateUser(data: { username?: string; password?: string }): ValidationResult {
        const errors: Record<string, string> = {};
        if (data.username !== undefined && !this.validateUsername(data.username)) {
            errors.username = ValidationMessages.username;
        }
        if (data.password !== undefined && !this.validatePassword(data.password)) {
            errors.password = ValidationMessages.password;
        }
        return { valid: Object.keys(errors).length === 0, errors };
    }

    validateImportData(data: unknown): boolean {
        if (!Array.isArray(data)) return false;
        return data.every(item =>
            typeof item === 'object' && item !== null &&
            'nim' in item && 'name' in item && 'department' in item && 'age' in item && 'gpa' in item
        );
    }

    sanitize(input: string): string {
        return input.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

export const validationService = ValidationService.getInstance();
export default ValidationService;
