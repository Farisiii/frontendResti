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

// Import components
import ActionButtons from './ActionButtons'
import ActivityLogList from './ActivityLogList'
import BalanceCard from './BalanceCard'
import Header from './Header'

// Import styles
import { smartParkStyles } from '../styles/smartParkStyles'

// Import hooks
import { useSmartParkData } from '../hooks/useSmartParkData'

type SmartParkScreenProps = {
  navigation?: any
}

export default function SmartParkScreen({ navigation }: SmartParkScreenProps) {
  // Use the custom hook to manage data and state
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

  const handleTopUp = () => {
    // Implement top up functionality
    console.log('Top up balance')
    // Navigate to top up screen if needed
    // navigation.navigate('TopUp')
  }

  const handleCheckVehicle = () => {
    // Implement check vehicle functionality
    console.log('Check vehicle')
    // Navigate to vehicle status screen if needed
    // navigation.navigate('VehicleStatus')
  }

  const handleViewActivityLog = () => {
    // Implement view full activity log functionality
    console.log('View full activity log')
    // Navigate to full activity log screen if needed
    // navigation.navigate('ActivityLog')
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

      {/* Header with back button */}
      <Header title="SmartPark Ganesha Operation" onBackPress={handleBack} />

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
