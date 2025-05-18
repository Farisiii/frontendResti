// Utility functions for formatting, validation, etc.

/**
 * Format currency amount to Indonesian Rupiah format
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "Rp 1.250.000")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Convert time string to formatted time
 * @param timeStr - Time string in format "HH.MM"
 * @returns Properly formatted time string
 */
export const formatTime = (timeStr: string): string => {
  // Simple validation
  if (!timeStr || !timeStr.includes('.')) return timeStr

  const [hours, minutes] = timeStr.split('.')

  // Add leading zeros if needed
  const formattedHours = hours.padStart(2, '0')
  const formattedMinutes = minutes.padStart(2, '0')

  return `${formattedHours}.${formattedMinutes}`
}

/**
 * Calculate time difference between current time and given time
 * @param timeStr - Time string in format "HH.MM"
 * @returns Duration in minutes
 */
export const calculateTimeDifference = (timeStr: string): number => {
  if (!timeStr || !timeStr.includes('.')) return 0

  const [hours, minutes] = timeStr.split('.').map(Number)
  const entryTime = new Date()
  entryTime.setHours(hours, minutes, 0, 0)

  const currentTime = new Date()

  // Handle case when entry was yesterday
  if (entryTime > currentTime) {
    entryTime.setDate(entryTime.getDate() - 1)
  }

  return Math.floor((currentTime.getTime() - entryTime.getTime()) / (1000 * 60))
}
