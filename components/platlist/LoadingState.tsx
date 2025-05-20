import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export const LoadingState: React.FC = () => {
  return (
    <View style={PlatListStyles.loadingContainer}>
      <ActivityIndicator size="large" color="#007D4B" />
      <Text style={PlatListStyles.loadingText}>Memuat data kendaraan...</Text>
    </View>
  )
}
