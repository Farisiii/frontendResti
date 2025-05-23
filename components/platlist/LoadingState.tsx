import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { smartParkStyles } from '@/styles/smartParkStyles'

export const LoadingState: React.FC = () => {
  return (
    <View style={smartParkStyles.loadingContainer}>
      <ActivityIndicator size="large" color="#E32636" />
      <Text>Memuat data...</Text>
    </View>
  )
}
