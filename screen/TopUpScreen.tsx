import { handleBackPress, handleComplete } from '@/utils/navigation'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import Header from '../components/Header'
import AmountDisplay from '../components/topup/AmountDisplay'
import ErrorModal from '../components/topup/ErrorModal'
import Numpad from '../components/topup/Numpad'
import PredefinedAmounts from '../components/topup/PredefinedAmounts'
import { useDimensions } from '../hooks/useDimensions'
import { formatCurrency, isValidAmount } from '../utils/currency'
import { responsive } from '../utils/responsive'

const TopUpScreen: React.FC = () => {
  const { isSmallScreen, isWeb } = useDimensions()

  // Changed: Use number for actual amount, string only for display
  const [actualAmount, setActualAmount] = useState<number>(0)
  const [displayAmount, setDisplayAmount] = useState<string>('0,00')
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  const updateAmount = (newAmount: number) => {
    setActualAmount(newAmount)
    setDisplayAmount(formatCurrency(newAmount))
  }

  const handleAmountSelection = (value: number) => {
    updateAmount(value)
  }

  const handleNumberPress = (num: number) => {
    // Use actualAmount instead of parsing from display string
    let newAmount = actualAmount * 10 + num

    // Prevent overflow
    if (newAmount >= 10000000000) {
      return
    }

    updateAmount(newAmount)
  }

  const handleDeletePress = () => {
    // Use actualAmount directly instead of parsing
    const newAmount = Math.floor(actualAmount / 10)
    updateAmount(newAmount)
  }

  const validateAndComplete = () => {
    // Validate the actual numeric amount
    if (isValidAmount(actualAmount) && actualAmount > 0) {
      handleComplete(actualAmount.toString())
    } else {
      setIsErrorModalVisible(true)
    }
  }

  const closeErrorModal = () => {
    setIsErrorModalVisible(false)
  }

  const predefinedAmounts = [
    { label: 'Rp10.000,00', value: 10000 },
    { label: 'Rp20.000,00', value: 20000 },
    { label: 'Rp30.000,00', value: 30000 },
    { label: 'Rp35.000,00', value: 35000 },
    { label: 'Rp45.000,00', value: 45000 },
    { label: 'Rp50.000,00', value: 50000 },
  ]

  const styles = getStyles()

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#E62132" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <Header
            title="Nominal Top Up"
            onBackPress={() => handleBackPress(isWeb)}
          />
        </View>

        <View
          style={[
            styles.content,
            responsive.isLandscape() && styles.contentLandscape,
          ]}
        >
          {/* Pass display amount to AmountDisplay */}
          <AmountDisplay amount={displayAmount} />

          <PredefinedAmounts
            predefinedAmounts={predefinedAmounts}
            selectedAmount={actualAmount}
            onAmountSelection={handleAmountSelection}
          />

          <Numpad
            onNumberPress={handleNumberPress}
            onDeletePress={handleDeletePress}
            onComplete={validateAndComplete}
          />
        </View>
      </SafeAreaView>

      <ErrorModal visible={isErrorModalVisible} onClose={closeErrorModal} />
    </>
  )
}

const getStyles = () => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F9F3C7',
    },
    headerContainer: {
      backgroundColor: '#E62132',
    },
    content: {
      flex: 1,
      padding: responsive.edgeInsets(12, 16, 20),
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#F9F3C7',
    },
    contentLandscape: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  })
}

export default TopUpScreen
