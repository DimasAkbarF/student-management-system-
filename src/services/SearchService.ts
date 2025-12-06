/**
 * Search Service
 * Implements various search algorithms
 */

import { IStudent } from '@/models/Student';

export interface SearchResult {
    algorithm: string;
    results: IStudent[];
    comparisons: number;
    timeComplexity: string;
    executionTime: number;
}

export class SearchService {
    private static instance: SearchService;

    private constructor() { }

    static getInstance(): SearchService {
        if (!SearchService.instance) {
            SearchService.instance = new SearchService();
        }
        return SearchService.instance;
    }

    /**
     * Linear Search - O(n)
     * Searches through each element sequentially
     */
    linearSearch(students: IStudent[], query: string, field: keyof IStudent = 'name'): SearchResult {
        const startTime = performance.now();
        let comparisons = 0;
        const results: IStudent[] = [];
        const queryLower = query.toLowerCase();

        for (const student of students) {
            comparisons++;
            const value = String(student[field]).toLowerCase();
            if (value.includes(queryLower)) {
                results.push(student);
            }
        }

        return {
            algorithm: 'Linear Search',
            results,
            comparisons,
            timeComplexity: 'O(n)',
            executionTime: performance.now() - startTime
        };
    }

    /**
     * Binary Search - O(log n)
     * Requires sorted array, searches by exact match
     */
    binarySearch(students: IStudent[], query: string, field: keyof IStudent = 'name'): SearchResult {
        const startTime = performance.now();
        let comparisons = 0;
        const results: IStudent[] = [];
        const queryLower = query.toLowerCase();

        // Sort array first for binary search
        const sorted = [...students].sort((a, b) =>
            String(a[field]).toLowerCase().localeCompare(String(b[field]).toLowerCase())
        );

        let left = 0;
        let right = sorted.length - 1;

        while (left <= right) {
            comparisons++;
            const mid = Math.floor((left + right) / 2);
            const value = String(sorted[mid][field]).toLowerCase();

            if (value === queryLower) {
                results.push(sorted[mid]);
                // Check for duplicates on both sides
                let i = mid - 1;
                while (i >= 0 && String(sorted[i][field]).toLowerCase() === queryLower) {
                    results.push(sorted[i]);
                    i--;
                    comparisons++;
                }
                i = mid + 1;
                while (i < sorted.length && String(sorted[i][field]).toLowerCase() === queryLower) {
                    results.push(sorted[i]);
                    i++;
                    comparisons++;
                }
                break;
            } else if (value < queryLower) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return {
            algorithm: 'Binary Search',
            results,
            comparisons,
            timeComplexity: 'O(log n)',
            executionTime: performance.now() - startTime
        };
    }

    /**
     * Sequential Search - O(n)
     * Similar to linear but returns first match only
     */
    sequentialSearch(students: IStudent[], query: string, field: keyof IStudent = 'name'): SearchResult {
        const startTime = performance.now();
        let comparisons = 0;
        const results: IStudent[] = [];
        const queryLower = query.toLowerCase();

        for (const student of students) {
            comparisons++;
            const value = String(student[field]).toLowerCase();
            if (value.includes(queryLower)) {
                results.push(student);
            }
        }

        return {
            algorithm: 'Sequential Search',
            results,
            comparisons,
            timeComplexity: 'O(n)',
            executionTime: performance.now() - startTime
        };
    }

    /**
     * Search with specified algorithm
     */
    search(
        students: IStudent[],
        query: string,
        algorithm: 'linear' | 'binary' | 'sequential' = 'linear',
        field: keyof IStudent = 'name'
    ): SearchResult {
        switch (algorithm) {
            case 'binary':
                return this.binarySearch(students, query, field);
            case 'sequential':
                return this.sequentialSearch(students, query, field);
            default:
                return this.linearSearch(students, query, field);
        }
    }
}

export const searchService = SearchService.getInstance();
export default SearchService;
