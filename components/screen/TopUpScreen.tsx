import { handleBackPress, handleComplete } from '@/utils/navigation'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { useDimensions } from '../../hooks/useDimensions'
import {
  formatCurrency,
  getWholeNumber,
  isValidAmount,
} from '../../utils/currency'
import { responsive } from '../../utils/responsive'
import Header from '../Header'
import AmountDisplay from '../topup/AmountDisplay'
import ErrorModal from '../topup/ErrorModal'
import Numpad from '../topup/Numpad'
import PredefinedAmounts from '../topup/PredefinedAmounts'

const TopUpScreen: React.FC = () => {
  const { isSmallScreen, isWeb } = useDimensions()
  const [amount, setAmount] = useState<string>('0,00')
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  const handleAmountSelection = (value: number) => {
    setSelectedAmount(value)
    setAmount(formatCurrency(value))
  }

  const handleNumberPress = (num: number) => {
    const currentWholeNumber = getWholeNumber(amount)
    let newWholeNumber = currentWholeNumber * 10 + num

    if (newWholeNumber >= 10000000000) {
      return
    }

    setSelectedAmount(newWholeNumber)
    setAmount(formatCurrency(newWholeNumber))
  }

  const handleDeletePress = () => {
    const currentWholeNumber = getWholeNumber(amount)
    const newWholeNumber = Math.floor(currentWholeNumber / 10)

    setSelectedAmount(newWholeNumber)
    setAmount(formatCurrency(newWholeNumber))
  }

  const validateAndComplete = () => {
    if (isValidAmount(selectedAmount)) {
      handleComplete()
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
          <AmountDisplay amount={amount} />

          <PredefinedAmounts
            predefinedAmounts={predefinedAmounts}
            selectedAmount={selectedAmount}
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
