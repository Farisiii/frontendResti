import { styles } from '@/styles/verificationStyles'
import React from 'react'
import { Text, View } from 'react-native'

interface TransactionDetailsProps {
  dynamicStyles: any
  amount: string // Amount dari TopUpScreen dalam format "50000"
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  dynamicStyles,
  amount,
}) => {
  // Fungsi untuk mengkonversi string amount ke format Rupiah
  const formatToRupiah = (amountString: string): string => {
    if (!amountString || amountString === '0' || amountString === 'undefined') {
      return 'Rp0,00'
    }

    const numericAmount = amountString.replace(/\D/g, '')
    const number = parseInt(numericAmount, 10)

    if (isNaN(number) || number === 0) {
      return 'Rp0,00'
    }

    const formatted = number.toLocaleString('id-ID')
    return `Rp${formatted},00`
  }

  const getCurrentDate = (): string => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    return `${day}/${month}/${year}`
  }

  const getCurrentTime = (): string => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${hours}.${minutes}`
  }

  const getVerifiedDate = (): string => {
    try {
      const currentDate = getCurrentDate()
      const dateObj = new Date()
      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        return currentDate
      } else {
        return '01/01/2025'
      }
    } catch (error) {
      console.warn('Date verification failed:', error)
      return '01/01/2025'
    }
  }

  const getVerifiedTime = (): string => {
    try {
      const currentTime = getCurrentTime()
      const now = new Date()
      if (now instanceof Date && !isNaN(now.getTime())) {
        return currentTime
      } else {
        return '00.00'
      }
    } catch (error) {
      console.warn('Time verification failed:', error)
      return '00.00'
    }
  }

  const formattedAmount = formatToRupiah(amount)
  const verifiedDate = getVerifiedDate()
  const verifiedTime = getVerifiedTime()

  React.useEffect(() => {
    console.log('TransactionDetails received amount:', amount)
    console.log('Formatted amount:', formattedAmount)
  }, [amount, formattedAmount])

  return (
    <View
      style={[
        styles.compactDetailsContainer,
        dynamicStyles.compactDetailsContainer,
      ]}
    >
      {/* Date and Time in single container */}
      <View style={[styles.detailRow, dynamicStyles.detailRow]}>
        <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
          Tanggal
        </Text>
        <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
          {verifiedDate}
        </Text>
      </View>

      <View style={[styles.detailRow, dynamicStyles.detailRow]}>
        <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
          Waktu
        </Text>
        <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
          {verifiedTime}
        </Text>
      </View>

      {/* Total Section - Integrated */}
      <View style={[styles.totalRow, dynamicStyles.totalRow]}>
        <Text style={[styles.totalLabel, dynamicStyles.totalLabel]}>
          Jumlah
        </Text>
        <Text style={[styles.totalValue, dynamicStyles.totalValue]}>
          {formattedAmount}
        </Text>
      </View>
    </View>
  )
}

export default TransactionDetails
