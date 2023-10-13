import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
    .join('-')
}
