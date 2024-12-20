/**
 * Generates a URL-friendly slug from a title
 * @param title The title to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-');     // Remove consecutive hyphens
}
