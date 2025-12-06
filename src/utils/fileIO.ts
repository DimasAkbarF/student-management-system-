/**
 * File I/O Utilities
 * Handles reading and writing JSON files for data persistence
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

/**
 * Ensure the data directory exists
 */
export function ensureDataDir(): void {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

/**
 * Read data from a JSON file
 * @param filename - Name of the file to read
 * @returns Parsed JSON data or empty array if file doesn't exist
 */
export function readJsonFile<T>(filename: string): T[] {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);

    try {
        if (!fs.existsSync(filePath)) {
            // Create empty file if it doesn't exist
            fs.writeFileSync(filePath, '[]', 'utf-8');
            return [];
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as T[];
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return [];
    }
}

/**
 * Write data to a JSON file
 * @param filename - Name of the file to write
 * @param data - Data to write
 */
export function writeJsonFile<T>(filename: string, data: T[]): void {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing file ${filename}:`, error);
        throw error;
    }
}

/**
 * Append data to a JSON file
 * @param filename - Name of the file
 * @param newData - Data to append
 */
export function appendJsonFile<T>(filename: string, newData: T[]): void {
    const existingData = readJsonFile<T>(filename);
    const combinedData = [...existingData, ...newData];
    writeJsonFile(filename, combinedData);
}

/**
 * Delete a specific item from a JSON file by ID
 * @param filename - Name of the file
 * @param id - ID of the item to delete
 */
export function deleteFromJsonFile(filename: string, id: number | string): void {
    const data = readJsonFile<{ id: number | string }>(filename);
    const filteredData = data.filter(item => item.id !== id);
    writeJsonFile(filename, filteredData);
}

/**
 * Update a specific item in a JSON file
 * @param filename - Name of the file
 * @param id - ID of the item to update
 * @param updates - Partial object with updates
 */
export function updateInJsonFile<T extends { id: number | string }>(
    filename: string,
    id: number | string,
    updates: Partial<T>
): void {
    const data = readJsonFile<T>(filename);
    const updatedData = data.map(item =>
        item.id === id ? { ...item, ...updates } : item
    );
    writeJsonFile(filename, updatedData);
}

/**
 * Check if a file exists
 * @param filename - Name of the file
 * @returns True if file exists
 */
export function fileExists(filename: string): boolean {
    const filePath = path.join(DATA_DIR, filename);
    return fs.existsSync(filePath);
}

/**
 * Get file path for exports
 * @param filename - Name of the file
 * @returns Full file path
 */
export function getFilePath(filename: string): string {
    return path.join(DATA_DIR, filename);
}

export default {
    readJsonFile,
    writeJsonFile,
    appendJsonFile,
    deleteFromJsonFile,
    updateInJsonFile,
    fileExists,
    getFilePath,
    ensureDataDir
};
