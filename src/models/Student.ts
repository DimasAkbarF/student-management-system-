/**
 * Student Model Class
 * Implements OOP principles with private fields, getters/setters, and validation
 */

import { RegexPatterns } from '@/utils/regex';

export interface IStudent {
    id: number;
    nim: string;
    name: string;
    department: string;
    age: number;
    gpa: number;
    createdAt?: string;
    updatedAt?: string;
}

export class Student {
    // Private fields
    #id: number;
    #nim: string;
    #name: string;
    #department: string;
    #age: number;
    #gpa: number;
    #createdAt: string;
    #updatedAt: string;

    constructor(data: IStudent) {
        this.#id = data.id;
        this.#nim = data.nim;
        this.#name = data.name;
        this.#department = data.department;
        this.#age = data.age;
        this.#gpa = data.gpa;
        this.#createdAt = data.createdAt || new Date().toISOString();
        this.#updatedAt = data.updatedAt || new Date().toISOString();

        // Validate on construction
        this.validate();
    }

    // ===== GETTERS =====
    get id(): number {
        return this.#id;
    }

    get nim(): string {
        return this.#nim;
    }

    get name(): string {
        return this.#name;
    }

    get department(): string {
        return this.#department;
    }

    get age(): number {
        return this.#age;
    }

    get gpa(): number {
        return this.#gpa;
    }

    get createdAt(): string {
        return this.#createdAt;
    }

    get updatedAt(): string {
        return this.#updatedAt;
    }

    // ===== SETTERS WITH VALIDATION =====
    set nim(value: string) {
        if (!RegexPatterns.nim.test(value)) {
            throw new ValidationError('NIM must be 10-12 digits');
        }
        this.#nim = value;
        this.#updatedAt = new Date().toISOString();
    }

    set name(value: string) {
        if (!RegexPatterns.name.test(value)) {
            throw new ValidationError('Name must be 2-100 letters only');
        }
        this.#name = value;
        this.#updatedAt = new Date().toISOString();
    }

    set department(value: string) {
        if (!RegexPatterns.department.test(value)) {
            throw new ValidationError('Department must be 2-100 letters');
        }
        this.#department = value;
        this.#updatedAt = new Date().toISOString();
    }

    set age(value: number) {
        if (!RegexPatterns.age.test(value.toString())) {
            throw new ValidationError('Age must be between 17 and 60');
        }
        this.#age = value;
        this.#updatedAt = new Date().toISOString();
    }

    set gpa(value: number) {
        if (value < 0 || value > 4) {
            throw new ValidationError('GPA must be between 0.00 and 4.00');
        }
        this.#gpa = value;
        this.#updatedAt = new Date().toISOString();
    }

    // ===== METHODS =====

    /**
     * Validate all fields
     * @throws ValidationError if any field is invalid
     */
    validate(): void {
        const errors: string[] = [];

        if (!RegexPatterns.nim.test(this.#nim)) {
            errors.push('NIM must be 10-12 digits');
        }
        if (!RegexPatterns.name.test(this.#name)) {
            errors.push('Name must be 2-100 letters only');
        }
        if (!RegexPatterns.department.test(this.#department)) {
            errors.push('Department must be 2-100 letters');
        }
        if (!RegexPatterns.age.test(this.#age.toString())) {
            errors.push('Age must be between 17 and 60');
        }
        if (this.#gpa < 0 || this.#gpa > 4) {
            errors.push('GPA must be between 0.00 and 4.00');
        }

        if (errors.length > 0) {
            throw new ValidationError(errors.join('; '));
        }
    }

    /**
     * Convert to plain JSON object
     */
    toJSON(): IStudent {
        return {
            id: this.#id,
            nim: this.#nim,
            name: this.#name,
            department: this.#department,
            age: this.#age,
            gpa: this.#gpa,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        };
    }

    /**
     * Create a Student instance from JSON data
     */
    static fromJSON(data: IStudent): Student {
        return new Student(data);
    }

    /**
     * Clone the student
     */
    clone(): Student {
        return new Student(this.toJSON());
    }

    /**
     * Get GPA classification
     */
    getGpaClassification(): string {
        if (this.#gpa >= 3.5) return 'Excellent';
        if (this.#gpa >= 3.0) return 'Good';
        if (this.#gpa >= 2.5) return 'Satisfactory';
        if (this.#gpa >= 2.0) return 'Pass';
        return 'Needs Improvement';
    }

    /**
     * String representation
     */
    toString(): string {
        return `Student { NIM: ${this.#nim}, Name: ${this.#name}, GPA: ${this.#gpa} }`;
    }
}

/**
 * Custom Validation Error
 */
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export default Student;
