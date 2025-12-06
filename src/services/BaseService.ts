/**
 * Base Service Class
 * Abstract base class providing common functionality for all services
 */

import { readJsonFile, writeJsonFile, ensureDataDir } from '@/utils/fileIO';
import { DatabaseError } from './ErrorHandler';

export abstract class BaseService<T extends { id: number }> {
    protected filename: string;

    constructor(filename: string) {
        this.filename = filename;
        ensureDataDir();
    }

    /**
     * Read all records from the data file
     * @returns Array of records
     */
    protected read(): T[] {
        try {
            return readJsonFile<T>(this.filename);
        } catch (error) {
            throw new DatabaseError(`Failed to read ${this.filename}`);
        }
    }

    /**
     * Write records to the data file
     * @param data - Array of records to write
     */
    protected write(data: T[]): void {
        try {
            writeJsonFile(this.filename, data);
        } catch (error) {
            throw new DatabaseError(`Failed to write to ${this.filename}`);
        }
    }

    /**
     * Generate next available ID
     * @returns Next ID number
     */
    protected getNextId(): number {
        const data = this.read();
        if (data.length === 0) return 1;
        const maxId = Math.max(...data.map(item => item.id));
        return maxId + 1;
    }

    /**
     * Find a record by ID
     * @param id - Record ID
     * @returns Record or null if not found
     */
    protected findById(id: number): T | null {
        const data = this.read();
        return data.find(item => item.id === id) || null;
    }

    /**
     * Check if a record exists by ID
     * @param id - Record ID
     * @returns True if exists
     */
    protected exists(id: number): boolean {
        return this.findById(id) !== null;
    }

    /**
     * Abstract validation method - must be implemented by subclasses
     * @param data - Data to validate
     */
    abstract validate(data: Partial<T>): void;

    /**
     * Get count of all records
     * @returns Number of records
     */
    protected getCount(): number {
        return this.read().length;
    }

    /**
     * Clear all records
     */
    protected clearAll(): void {
        this.write([]);
    }

    /**
     * Log operation for debugging
     * @param operation - Operation name
     * @param details - Additional details
     */
    protected log(operation: string, details?: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${this.constructor.name}.${operation}${details ? `: ${details}` : ''}`);
    }
}

export default BaseService;
