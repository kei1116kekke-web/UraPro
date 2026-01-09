/**
 * Generate a unique, readable ID for diagnosis results
 * Format: UP-[YY]-[XXXX]
 * Example: UP-26-K9Z1
 */
export function generateReadableId(): string {
    const year = new Date().getFullYear().toString().slice(-2);

    // Use characters that are easy to distinguish (no O/0, I/1, etc.)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let random = '';
    for (let i = 0; i < 4; i++) {
        random += chars[Math.floor(Math.random() * chars.length)];
    }

    return `UP-${year}-${random}`;
}

/**
 * Validate ID format
 */
export function validateReadableId(id: string): boolean {
    const pattern = /^UP-\d{2}-[A-Z2-9]{4}$/;
    return pattern.test(id);
}
