import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(description: string, maxLength: number): string {
  if (description.length <= maxLength) {
    return description
  }

  return description.substring(0, maxLength - 3) + '...'
}
