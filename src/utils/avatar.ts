/**
 * Avatar Utility Functions
 * Generates initials and colors for automatic name-based avatars
 */

/**
 * Extract initials from full name (supports multi-word names)
 * Example: "Dimas Akbar Faturohman" → "DAF"
 * Example: "Alfrendo Suranta" → "AS"
 * @param name - Full name string
 * @returns Initials (max 3 characters)
 */
export function getInitials(name: string): string {
    if (!name || typeof name !== 'string') return 'U';

    const words = name.trim().split(/\s+/).filter(word => word.length > 0);

    if (words.length === 0) return 'U';
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

    // Get first letter of each word (max 3)
    const initials = words
        .slice(0, 3)
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    return initials;
}

/**
 * Generate a consistent color based on a name string
 * Uses a simple hash function to ensure the same name always gets the same color
 * @param name - Name to generate color for
 * @returns Object with background gradient and text color classes
 */
export function getAvatarColor(name: string): { gradient: string; textColor: string } {
    // Define avatar color palette with gradients
    const colors = [
        { gradient: 'from-blue-500 to-blue-600', textColor: 'text-white' },
        { gradient: 'from-emerald-500 to-emerald-600', textColor: 'text-white' },
        { gradient: 'from-violet-500 to-violet-600', textColor: 'text-white' },
        { gradient: 'from-amber-500 to-amber-600', textColor: 'text-white' },
        { gradient: 'from-rose-500 to-rose-600', textColor: 'text-white' },
        { gradient: 'from-cyan-500 to-cyan-600', textColor: 'text-white' },
        { gradient: 'from-indigo-500 to-indigo-600', textColor: 'text-white' },
        { gradient: 'from-pink-500 to-pink-600', textColor: 'text-white' },
        { gradient: 'from-teal-500 to-teal-600', textColor: 'text-white' },
        { gradient: 'from-orange-500 to-orange-600', textColor: 'text-white' },
    ];

    // Simple hash function based on name
    let hash = 0;
    const str = name.toLowerCase().trim();
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }

    // Get color index from hash
    const index = Math.abs(hash) % colors.length;
    return colors[index];
}

/**
 * Avatar component props generator
 * Combines initials and colors for easy avatar rendering
 */
export function getAvatarProps(name: string) {
    return {
        initials: getInitials(name),
        ...getAvatarColor(name),
    };
}
