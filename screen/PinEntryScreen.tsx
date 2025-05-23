// import { useDimensions } from '@/hooks/useDimensions'
// import { styles } from '@/styles/pinEntryStyles'
// import { handleBackPress, handlePinTrue } from '@/utils/navigation'
// import { useLocalSearchParams } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import {
//   Alert,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native'
// import Header from '../components/Header'
// import Numpad from '../components/topup/Numpad'

// const PinEntryScreen: React.FC = () => {
//   const { isSmallScreen, isWeb } = useDimensions()
//   const [pin, setPin] = useState<string>('')
//   const [isError, setIsError] = useState<boolean>(false)
//   const [dimensions, setDimensions] = useState(Dimensions.get('window'))

//   // Get amount from route params
//   const { amount } = useLocalSearchParams<{ amount?: string }>()

//   const CORRECT_PIN = '123456'

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({ window }) => {
//       setDimensions(window)
//     })

//     return () => subscription?.remove()
//   }, [])

//   const handleNumberPress = (num: number) => {
//     if (pin.length < 6) {
//       setPin((prevPin) => prevPin + num)
//       setIsError(false)
//     }
//   }

//   const handleDeletePress = () => {
//     setPin((prevPin) => prevPin.slice(0, -1))
//     setIsError(false)
//   }

//   const handleComplete = () => {
//     if (pin === CORRECT_PIN) {
//       handlePinTrue(amount)
//     } else {
//       setIsError(true)
//       setPin('')
//     }
//   }

//   const handleForgotPin = () => {
//     Alert.alert('Lupa PIN?', 'Hubungi customer service untuk reset PIN Anda.', [
//       { text: 'OK', onPress: () => console.log('OK Pressed') },
//     ])
//   }

//   const { width, height } = dimensions
//   const isSmallDevice = width < 375
//   const isMediumDevice = width >= 375 && width < 414
//   const isLargeDevice = width >= 414
//   const isLandscape = width > height

//   const buttonSize = isLandscape
//     ? Math.min(width * 0.14, height * 0.22)
//     : Math.min(width * 0.25, height * 0.12)

//   const pinDotSize = isSmallDevice ? 20 : isMediumDevice ? 24 : 28
//   const pinDotSpacing = isSmallDevice ? 6 : isMediumDevice ? 8 : 10
//   const buttonMargin = Math.min(width * 0.01, height * 0.005)

//   const fontSize = isSmallDevice
//     ? { large: 22, medium: 16, small: 13 }
//     : { large: 26, medium: 18, small: 15 }

//   const renderPinDots = () => {
//     const dots = []
//     for (let i = 0; i < 6; i++) {
//       dots.push(
//         <View
//           key={i}
//           style={[
//             styles.pinDot,
//             {
//               width: pinDotSize,
//               height: pinDotSize,
//               marginHorizontal: pinDotSpacing,
//             },
//             i < pin.length && styles.pinDotFilled,
//             isError && styles.pinDotError,
//           ]}
//         />
//       )
//     }
//     return dots
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#E62132" barStyle="light-content" />
//       <View style={styles.headerContainer}>
//         <Header
//           title="Masukkan PIN Kamu, Bihurin"
//           onBackPress={() => handleBackPress(isWeb)}
//         />
//       </View>

//       <View style={[styles.content, isLandscape && styles.contentLandscape]}>
//         <View style={styles.pinContainer}>
//           <View style={styles.pinDotsContainer}>{renderPinDots()}</View>
//           <TouchableOpacity onPress={handleForgotPin}>
//             <Text style={styles.forgotPinText}>lupa pin?</Text>
//           </TouchableOpacity>
//         </View>

//         <Numpad
//           onNumberPress={handleNumberPress}
//           onDeletePress={handleDeletePress}
//           onComplete={handleComplete}
//         />
//       </View>
//     </SafeAreaView>
//   )
// }

// export default PinEntryScreen
