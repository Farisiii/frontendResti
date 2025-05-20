import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { getVerificationDynamicStyles } from '@/styles/verificationDynamicStyles'
import { handleTransactionComplete } from '@/utils/navigation'
import { responsive } from '@/utils/responsive'
import { useDimensions } from '../../hooks/useDimensions'
import { styles } from '../../styles/verificationStyles'
import SuccessIcon from '../verification/SuccessIcon'
import TransactionDetails from '../verification/TransactionDetails'

const Verification: React.FC = () => {
  const { dimensions, isSmallScreen, isWeb, isPortrait } = useDimensions()

  const dynamicStyles = getVerificationDynamicStyles()

  const webMaxWidth = responsive.width(isSmallScreen ? 90 : 80)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.centeredContainer}>
        <View
          style={[
            styles.contentWrapper,
            isWeb && {
              maxWidth: Math.min(480, webMaxWidth),
              width: '100%',
            },
          ]}
        >
          <View style={[styles.successCard, dynamicStyles.successCard]}>
            {/* Success Icon - Responsive size */}
            <SuccessIcon
              iconSize={dynamicStyles.iconSize}
              successIconStyle={[styles.successIcon, dynamicStyles.successIcon]}
            />

            {/* Transaction Details */}
            <TransactionDetails dynamicStyles={dynamicStyles} />
          </View>
        </View>
      </View>

      {/* Fixed button at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            dynamicStyles.buttonPadding,
            isWeb && ({ cursor: 'pointer' } as any),
          ]}
          onPress={handleTransactionComplete}
        >
          <Text style={[styles.completeButtonText, dynamicStyles.buttonText]}>
            TRANSAKSI SELESAI
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Verification
