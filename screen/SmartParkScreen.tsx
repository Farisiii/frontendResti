import React, { useCallback, useEffect } from 'react'
import {
  AppState,
  AppStateStatus,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { smartParkStyles } from '@/styles/smartParkStyles'
import Header from '../components/Header'
import ActionButtons from '../components/home/ActionButtons'
import ActivityLogList from '../components/home/ActivityLogList'
import BalanceCard from '../components/home/BalanceCard'
import { useSmartParkData } from '../hooks/useSmartParkData'

import { LoadingState } from '@/components/platlist/LoadingState'
import { handleCheckVehicle, handleTopUp } from '@/utils/navigation'
import { router } from 'expo-router'

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
    refreshing,
    lastRefreshTime,
    autoRefreshEnabled,
    toggleBalanceVisibility,
    refreshData,
    refreshActivityLog,
    setAutoRefresh,
  } = useSmartParkData()

  // Handle app state changes untuk pause/resume auto-refresh
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('App state changed to:', nextAppState)

      if (nextAppState === 'active') {
        // App kembali aktif, enable auto-refresh dan refresh data
        console.log(
          'App became active, enabling auto-refresh and refreshing data'
        )
        setAutoRefresh(true)
        refreshData()
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        // App di background, disable auto-refresh untuk hemat battery
        console.log('App went to background, disabling auto-refresh')
        setAutoRefresh(false)
      }
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      subscription?.remove()
    }
  }, [setAutoRefresh, refreshData])

  // Handle focus event untuk refresh data ketika screen kembali aktif
  useEffect(() => {
    const unsubscribe = navigation?.addListener?.('focus', () => {
      console.log('SmartPark screen focused, refreshing data')
      refreshData()
    })

    return unsubscribe
  }, [navigation, refreshData])

  const handleViewActivityLog = useCallback(() => {
    // Implementasi untuk view detail activity log
    console.log('View activity log clicked')
    // Bisa navigate ke screen detail atau modal
  }, [])

  const handleManualRefresh = useCallback(async () => {
    console.log('Manual refresh triggered')
    await refreshData()
  }, [refreshData])

  const handleActivityLogRefresh = useCallback(async () => {
    console.log('Activity log manual refresh triggered')
    await refreshActivityLog()
  }, [refreshActivityLog])

  const handleToggleAutoRefresh = useCallback(() => {
    const newState = !autoRefreshEnabled
    setAutoRefresh(newState)
    console.log(`Auto-refresh ${newState ? 'enabled' : 'disabled'} by user`)
  }, [autoRefreshEnabled, setAutoRefresh])

  return (
    <SafeAreaView style={smartParkStyles.container}>
      {Platform.OS !== 'web' && (
        <StatusBar
          backgroundColor="#E32636"
          barStyle="light-content"
          translucent={Platform.OS === 'android'}
        />
      )}

      {/* Header tanpa tombol back tapi dengan profile button */}
      <Header
        title="SmartPark GO"
        showBackButton={false}
        showLogoutButton={true}
        showProfileButton={true}
        onLogout={() => {
          router.push('/login')
        }}
      />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <View style={smartParkStyles.loadingContainer}>
          <Text style={smartParkStyles.errorText}>{error}</Text>
          <TouchableOpacity
            style={smartParkStyles.actionButton}
            onPress={handleManualRefresh}
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

          {/* Activity Log dengan auto-refresh */}
          <ActivityLogList
            logs={activityLog}
            onViewMore={handleViewActivityLog}
            onRefresh={handleActivityLogRefresh}
            refreshing={refreshing}
            autoRefreshInterval={30000} // 30 detik
            enableAutoRefresh={autoRefreshEnabled}
          />
        </>
      )}
    </SafeAreaView>
  )
}
