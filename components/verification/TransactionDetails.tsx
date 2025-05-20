import { styles } from '@/styles/verificationStyles'
import React from 'react'
import { Text, View } from 'react-native'

interface TransactionDetailsProps {
  dynamicStyles: any
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  dynamicStyles,
}) => {
  return (
    <>
      <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
            Tanggal
          </Text>
          <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
            06/05/2025
          </Text>
        </View>
      </View>

      <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
            Waktu
          </Text>
          <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
            09.10
          </Text>
        </View>
      </View>

      <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
            Jumlah
          </Text>
          <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
            Rp50.000,00
          </Text>
        </View>
      </View>

      {/* Total Section - Responsive */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, dynamicStyles.totalLabel]}>
            TOTAL
          </Text>
          <Text style={[styles.totalValue, dynamicStyles.totalValue]}>
            Rp50.000,00
          </Text>
        </View>
      </View>
    </>
  )
}

export default TransactionDetails
