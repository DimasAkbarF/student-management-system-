/**
 * Regex Validation Patterns
 * Contains all validation patterns used throughout the application
 */

export const RegexPatterns = {
    // NIM: 10-12 digit number
    nim: /^[0-9]{10,12}$/,

    // Name: Only letters and spaces, 2-100 characters
    name: /^[A-Za-z ]{2,100}$/,

    // GPA: 0.00 to 4.00
    gpa: /^(?:[0-3]\.\d{1,2}|4\.00|[0-3])$/,

    // Age: 17-60 years
    age: /^(1[7-9]|[2-5][0-9]|60)$/,

    // Department: Letters, spaces, and common punctuation
    department: /^[A-Za-z &\-]{2,100}$/,

    // Username: 3-30 alphanumeric characters and underscores
    username: /^[a-zA-Z0-9_]{3,30}$/,

    // Password: At least 6 characters
    password: /^.{6,}$/,

    // Email: Standard email format
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
} as const;

/**
 * Validation Messages
 */
export const ValidationMessages = {
    nim: 'NIM must be 10-12 digits',
    name: 'Name must be 2-100 letters only',
    gpa: 'GPA must be between 0.00 and 4.00',
    age: 'Age must be between 17 and 60',
    department: 'Department must be 2-100 letters',
    username: 'Username must be 3-30 alphanumeric characters',
    password: 'Password must be at least 6 characters',
    email: 'Please enter a valid email address'
} as const;

/**
 * Validate a value against a specific pattern
 * @param field - The field name to validate
 * @param value - The value to validate
 * @returns True if valid, false otherwise
 */
export function validateField(field: keyof typeof RegexPatterns, value: string): boolean {
    const pattern = RegexPatterns[field];
    if (!pattern) return false;
    return pattern.test(value);
}

/**
 * Get validation message for a field
 * @param field - The field name
 * @returns The validation message
 */
export function getValidationMessage(field: keyof typeof ValidationMessages): string {
    return ValidationMessages[field] || 'Invalid input';
}

/**
 * Validate multiple fields at once
 * @param data - Object with field names and values
 * @returns Object with field names and validation results
 */
export function validateMultipleFields(
    data: Record<string, string>
): Record<string, { valid: boolean; message: string }> {
    const results: Record<string, { valid: boolean; message: string }> = {};

    for (const [field, value] of Object.entries(data)) {
        if (field in RegexPatterns) {
            const isValid = validateField(field as keyof typeof RegexPatterns, value);
            results[field] = {
                valid: isValid,
                message: isValid ? '' : getValidationMessage(field as keyof typeof ValidationMessages)
            };
        }
    }

    return results;
}

/**
 * Sanitize input string to prevent XSS
 * @param input - The input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

export default {
    RegexPatterns,
    ValidationMessages,
    validateField,
    getValidationMessage,
    validateMultipleFields,
    sanitizeInput
};
