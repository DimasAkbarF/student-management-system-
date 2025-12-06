/**
 * Sort Service
 * Implements various sorting algorithms
 */

import { IStudent } from '@/models/Student';

export interface SortResult {
    algorithm: string;
    data: IStudent[];
    comparisons: number;
    swaps: number;
    timeComplexity: string;
    executionTime: number;
}

type SortField = 'nim' | 'name' | 'department' | 'age' | 'gpa';
type SortOrder = 'asc' | 'desc';

export class SortService {
    private static instance: SortService;

    private constructor() { }

    static getInstance(): SortService {
        if (!SortService.instance) {
            SortService.instance = new SortService();
        }
        return SortService.instance;
    }

    private compare(a: IStudent, b: IStudent, field: SortField, order: SortOrder): number {
        let aVal = a[field];
        let bVal = b[field];
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return order === 'asc' ? result : -result;
    }

    insertionSort(students: IStudent[], field: SortField = 'name', order: SortOrder = 'asc'): SortResult {
        const startTime = performance.now();
        const arr = [...students];
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < arr.length; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= 0 && this.compare(arr[j], key, field, order) > 0) {
                comparisons++;
                arr[j + 1] = arr[j];
                swaps++;
                j--;
            }
            comparisons++;
            arr[j + 1] = key;
        }

        return { algorithm: 'Insertion Sort', data: arr, comparisons, swaps, timeComplexity: 'O(n²)', executionTime: performance.now() - startTime };
    }

    bubbleSort(students: IStudent[], field: SortField = 'name', order: SortOrder = 'asc'): SortResult {
        const startTime = performance.now();
        const arr = [...students];
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                comparisons++;
                if (this.compare(arr[j], arr[j + 1], field, order) > 0) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps++;
                }
            }
        }

        return { algorithm: 'Bubble Sort', data: arr, comparisons, swaps, timeComplexity: 'O(n²)', executionTime: performance.now() - startTime };
    }

    selectionSort(students: IStudent[], field: SortField = 'name', order: SortOrder = 'asc'): SortResult {
        const startTime = performance.now();
        const arr = [...students];
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < arr.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                if (this.compare(arr[j], arr[minIdx], field, order) < 0) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                swaps++;
            }
        }

        return { algorithm: 'Selection Sort', data: arr, comparisons, swaps, timeComplexity: 'O(n²)', executionTime: performance.now() - startTime };
    }

    mergeSort(students: IStudent[], field: SortField = 'name', order: SortOrder = 'asc'): SortResult {
        const startTime = performance.now();
        let comparisons = 0;

        const merge = (left: IStudent[], right: IStudent[]): IStudent[] => {
            const result: IStudent[] = [];
            while (left.length && right.length) {
                comparisons++;
                if (this.compare(left[0], right[0], field, order) <= 0) {
                    result.push(left.shift()!);
                } else {
                    result.push(right.shift()!);
                }
            }
            return [...result, ...left, ...right];
        };

        const sort = (arr: IStudent[]): IStudent[] => {
            if (arr.length <= 1) return arr;
            const mid = Math.floor(arr.length / 2);
            return merge(sort(arr.slice(0, mid)), sort(arr.slice(mid)));
        };

        const data = sort([...students]);
        return { algorithm: 'Merge Sort', data, comparisons, swaps: 0, timeComplexity: 'O(n log n)', executionTime: performance.now() - startTime };
    }

    shellSort(students: IStudent[], field: SortField = 'name', order: SortOrder = 'asc'): SortResult {
        const startTime = performance.now();
        const arr = [...students];
        let comparisons = 0, swaps = 0;

        for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < arr.length; i++) {
                const temp = arr[i];
                let j = i;
                while (j >= gap && this.compare(arr[j - gap], temp, field, order) > 0) {
                    comparisons++;
                    arr[j] = arr[j - gap];
                    swaps++;
                    j -= gap;
                }
                comparisons++;
                arr[j] = temp;
            }
        }

        return { algorithm: 'Shell Sort', data: arr, comparisons, swaps, timeComplexity: 'O(n^(3/2))', executionTime: performance.now() - startTime };
    }

    sort(students: IStudent[], algorithm: string, field: SortField = 'name', order: SortOrder = 'asc'): SortResult {
        switch (algorithm) {
            case 'bubble': return this.bubbleSort(students, field, order);
            case 'selection': return this.selectionSort(students, field, order);
            case 'merge': return this.mergeSort(students, field, order);
            case 'shell': return this.shellSort(students, field, order);
            default: return this.insertionSort(students, field, order);
        }
    }
}

export const sortService = SortService.getInstance();
export default SortService;
