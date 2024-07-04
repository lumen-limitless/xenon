import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Shortens a UUID by removing the dashes and replacing the middle section with ellipsis.
 * @param uuid - The UUID to be shortened.
 * @returns The shortened UUID.
 */
export function shortenUUID(uuid: string): string {
  return uuid.split('-')[0] + '...' + uuid.slice(-4);
}

/**
 * Capitalizes the first letter of a string.
 * @param text - The input string.
 * @returns The input string with the first letter capitalized.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formats a given amount in dollars.
 *
 * @param amount - The amount to be formatted.
 * @returns The formatted amount as a string.
 */
export function formatDollars(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}

/**
 * Generates a slug from the given text.
 * A slug is a URL-friendly string that is typically used in URLs to represent a resource.
 * This function converts the text to lowercase, removes any non-alphanumeric characters,
 * and replaces spaces with hyphens to create the slug.
 *
 * @param text - The text to generate the slug from.
 * @returns The generated slug.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter((word) => word !== '')
    .join('-');
}

/**
 * Calculates the percentage difference between two numbers.
 *
 * @param previous - The previous number.
 * @param current - The current number.
 * @returns The percentage difference as a string.
 */
export function calculatePercentageDifference(
  previous: number,
  current: number,
): string {
  return (((current - previous) / previous) * 100).toFixed(0);
}
