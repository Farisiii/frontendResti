import React, { useEffect, useRef } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { smartParkStyles } from '../../styles/smartParkStyles'
import { ActivityLogItem } from '../../types/smartPark'

type ActivityLogListProps = {
  logs: ActivityLogItem[]
  onViewMore?: () => void
  onRefresh?: () => Promise<void>
  refreshing?: boolean
  autoRefreshInterval?: number // dalam milidetik, default 30 detik
  enableAutoRefresh?: boolean
}

/**
 * Activity Log List component for showing vehicle entry/exit history
 * With automatic scrolling when more than 8 items are present or based on screen height
 * Now includes auto-refresh capability for real-time updates
 */
const ActivityLogList: React.FC<ActivityLogListProps> = ({
  logs,
  onViewMore,
  onRefresh,
  refreshing = false,
  autoRefreshInterval = 30000, // 30 detik default
  enableAutoRefresh = true,
}) => {
  const intervalRef = useRef<number | null>(null)
  const previousLogsLengthRef = useRef(logs.length)

  // Auto-refresh effect
  useEffect(() => {
    if (enableAutoRefresh && onRefresh) {
      // Set up interval untuk auto-refresh
      intervalRef.current = setInterval(() => {
        onRefresh()
      }, autoRefreshInterval)

      // Cleanup interval saat component unmount atau dependencies berubah
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
  }, [enableAutoRefresh, onRefresh, autoRefreshInterval])

  // Effect untuk detect perubahan data
  useEffect(() => {
    const currentLogsLength = logs.length

    // Jika ada penambahan data baru, log untuk debuggin

    previousLogsLengthRef.current = currentLogsLength
  }, [logs])

  // Cleanup interval saat component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const hasLogs = logs && logs.length > 0

  if (!hasLogs) {
    return (
      <View style={smartParkStyles.activityLogContainerEmpty}>
        <View style={smartParkStyles.emptyStateContainer}>
          <Text style={smartParkStyles.emptyStateText}>
            Belum ada aktivitas kendaraan
          </Text>
        </View>
      </View>
    )
  }

  return (
    <>
      {/* Log Button - hanya tampil ketika ada logs */}
      <View style={smartParkStyles.logButtonActive}>
        <Text style={smartParkStyles.logButtonText}>Log Aktivitas</Text>
      </View>

      {/* Activity Log Container dengan logs */}
      <View style={smartParkStyles.activityLogContainer}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#E32636']} // Android
                tintColor="#E32636" // iOS
                title="Memuat aktivitas..."
                titleColor="#666"
              />
            ) : undefined
          }
        >
          {logs.map((item) => (
            <View key={item.id} style={smartParkStyles.logRow}>
              <Text style={smartParkStyles.logIdText}>{item.id}</Text>
              <Text
                style={[
                  smartParkStyles.logTypeText,
                  item.type === 'masuk'
                    ? smartParkStyles.logTypeTextIn
                    : smartParkStyles.logTypeTextOut,
                ]}
              >
                Kendaraan ({item.vehicle_plate}){' '}
                {item.type === 'masuk' ? 'Masuk' : 'Keluar'}
              </Text>
              <Text style={smartParkStyles.logTimeText}>{item.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default ActivityLogList
