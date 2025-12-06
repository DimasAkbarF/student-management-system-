/**
 * Student Service
 * Handles all student-related CRUD operations
 */

import { BaseService } from './BaseService';
import { IStudent } from '@/models/Student';
import { ValidationError, NotFoundError, DuplicateError } from './ErrorHandler';
import { validationService } from './ValidationService';

export class StudentService extends BaseService<IStudent> {
    private static instance: StudentService;

    private constructor() {
        super('students.json');
    }

    static getInstance(): StudentService {
        if (!StudentService.instance) {
            StudentService.instance = new StudentService();
        }
        return StudentService.instance;
    }

    validate(data: Partial<IStudent>): void {
        const result = validationService.validateStudent(data);
        if (!result.valid) {
            throw new ValidationError('Invalid student data', result.errors);
        }
    }

    getAllStudents(): IStudent[] {
        return this.read();
    }

    getStudentById(id: number): IStudent {
        const student = this.findById(id);
        if (!student) throw new NotFoundError('Student');
        return student;
    }

    addStudent(data: Omit<IStudent, 'id' | 'createdAt' | 'updatedAt'>): IStudent {
        this.validate(data);
        const students = this.read();
        if (students.some(s => s.nim === data.nim)) {
            throw new DuplicateError('NIM');
        }
        const newStudent: IStudent = {
            ...data,
            id: this.getNextId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        students.push(newStudent);
        this.write(students);
        return newStudent;
    }

    updateStudent(id: number, data: Partial<IStudent>): IStudent {
        this.validate(data);
        const students = this.read();
        const index = students.findIndex(s => s.id === id);
        if (index === -1) throw new NotFoundError('Student');
        if (data.nim && data.nim !== students[index].nim) {
            if (students.some(s => s.nim === data.nim && s.id !== id)) {
                throw new DuplicateError('NIM');
            }
        }
        students[index] = { ...students[index], ...data, updatedAt: new Date().toISOString() };
        this.write(students);
        return students[index];
    }

    deleteStudent(id: number): void {
        const students = this.read();
        const index = students.findIndex(s => s.id === id);
        if (index === -1) throw new NotFoundError('Student');
        students.splice(index, 1);
        this.write(students);
    }

    importJSON(data: Omit<IStudent, 'id'>[], replace: boolean = false): number {
        let students = replace ? [] : this.read();
        let imported = 0;
        for (const item of data) {
            try {
                this.validate(item);
                if (!students.some(s => s.nim === item.nim)) {
                    students.push({
                        ...item,
                        id: this.getNextId() + imported,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                    imported++;
                }
            } catch { /* skip invalid */ }
        }
        this.write(students);
        return imported;
    }

    exportJSON(): IStudent[] {
        return this.getAllStudents();
    }

    getStats(): { total: number; avgGpa: number; departments: string[] } {
        const students = this.read();
        const avgGpa = students.length > 0
            ? students.reduce((sum, s) => sum + s.gpa, 0) / students.length
            : 0;
        const departments = [...new Set(students.map(s => s.department))];
        return { total: students.length, avgGpa: Math.round(avgGpa * 100) / 100, departments };
    }
}

export const studentService = StudentService.getInstance();
export default StudentService;
