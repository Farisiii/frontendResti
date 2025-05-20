import React from 'react'
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Header from '../Header'
import ActionButtons from '../home/ActionButtons'
import ActivityLogList from '../home/ActivityLogList'
import BalanceCard from '../home/BalanceCard'
import { smartParkStyles } from '@/styles/smartParkStyles'
import { useSmartParkData } from '../../hooks/useSmartParkData'

import { handleCheckVehicle, handleTopUp } from '@/utils/navigation'

type SmartParkScreenProps = {
  navigation?: any
}

export default function SmartParkScreen({ navigation }: SmartParkScreenProps) {
  const {
    userName,
    balance,
    hideBalance,
    activityLog,
    isLoading,
    error,
    toggleBalanceVisibility,
    refreshData,
  } = useSmartParkData()

  const handleViewActivityLog = () => {
    console.log('View full activity log')
  }

  const handleBack = () => {
    if (navigation) {
      navigation.goBack()
    } else {
      console.log('No navigation prop provided')
    }
  }

  return (
    <SafeAreaView style={smartParkStyles.container}>
      {Platform.OS !== 'web' && (
        <StatusBar
          backgroundColor="#E32636"
          barStyle="light-content"
          translucent={Platform.OS === 'android'}
        />
      )}

      {/* Header tanpa tombol back */}
      <Header title="SmartPark Ganesha Operation" showBackButton={false} />

      {isLoading ? (
        <View style={smartParkStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#E32636" />
          <Text>Memuat data...</Text>
        </View>
      ) : error ? (
        <View style={smartParkStyles.loadingContainer}>
          <Text style={smartParkStyles.errorText}>{error}</Text>
          <TouchableOpacity
            style={smartParkStyles.actionButton}
            onPress={refreshData}
          >
            <Text style={smartParkStyles.actionButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Balance Section */}
          <BalanceCard
            userName={userName}
            balance={balance}
            hideBalance={hideBalance}
            onToggleVisibility={toggleBalanceVisibility}
          />

          {/* Action Buttons */}
          <ActionButtons
            onTopUp={handleTopUp}
            onCheckVehicle={handleCheckVehicle}
          />

          {/* Activity Log */}
          <ActivityLogList
            logs={activityLog}
            onViewMore={handleViewActivityLog}
          />
        </>
      )}
    </SafeAreaView>
  )
}
