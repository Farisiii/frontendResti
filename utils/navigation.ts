import { router } from 'expo-router'

/**
 * Handle back navigation based on platform
 * @param isWeb Whether the app is running on web
 *
 *
 */

export const handleCheckVehicle = (): void => {
  console.log('Check vehicle')
  router.push('/platList')
}

export const handleTopUp = () => {
  console.log('Top up balance')
  router.push('/topUp')
}

export const handleBackPress = (isWeb: boolean): void => {
  console.log('Back button pressed')
  router.push('/smart-park')
}
export const handleTransactionComplete = (): void => {
  console.log('Transaction complete button pressed')
  router.push('/smart-park')
}

export const handleComplete = (amount?: string) => {
  if (amount && amount !== 'undefined') {
    router.push({
      pathname: '/verification',
      params: { amount },
    })
  } else {
    return
  }
}

export const handlePinTrue = (amount?: string) => {
  router.push({ pathname: '/verification', params: { amount } })
}

export const handleSignUp = () => {
  router.push('/register')
}
