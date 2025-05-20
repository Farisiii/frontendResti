export const getWholeNumber = (formattedAmount: string): number => {
  const wholePart = formattedAmount.split(',')[0]

  const numericString = wholePart.replace(/\./g, '')

  return parseInt(numericString, 10) || 0
}

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const isValidAmount = (amount: number): boolean => {
  return amount >= 10000
}
