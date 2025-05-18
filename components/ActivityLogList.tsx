import React from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { smartParkStyles } from '../styles/smartParkStyles'
import { ActivityLogItem } from '../types/smartPark'

type ActivityLogListProps = {
  logs: ActivityLogItem[]
  onViewMore?: () => void
}

/**
 * Activity Log List component for showing vehicle entry/exit history
 * With automatic scrolling when more than 8 items are present or based on screen height
 */
const ActivityLogList: React.FC<ActivityLogListProps> = ({
  logs,
  onViewMore,
}) => {
  // Get screen dimensions to help determine max height for the log container
  const { height } = Dimensions.get('window')

  // Define the maximum number of items before scrolling
  const MAX_VISIBLE_ITEMS = 10

  // Define a single log item's approximate height (adjust as needed)
  const ITEM_HEIGHT = 50

  // Calculate the maximum height for the log container
  // This ensures it won't take more than ~40% of screen height
  const maxLogContainerHeight = Math.min(
    MAX_VISIBLE_ITEMS * ITEM_HEIGHT,
    height * 0.625
  )

  if (logs.length === 0) {
    return (
      <View
        style={[
          smartParkStyles.activityLogContainer,
          { justifyContent: 'center', alignItems: 'center', padding: 20 },
        ]}
      >
        <Text>Belum ada aktivitas kendaraan</Text>
      </View>
    )
  }

  return (
    <>
      <View style={smartParkStyles.logButton}>
        <Text style={smartParkStyles.logButtonText}>Log Aktivitas</Text>
      </View>

      <View
        style={[
          smartParkStyles.activityLogContainer,
          { maxHeight: maxLogContainerHeight },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {logs.map((item) => (
            <View key={item.id} style={smartParkStyles.logRow}>
              <Text style={smartParkStyles.logIdText}>{item.id}</Text>
              <Text
                style={
                  [
                    smartParkStyles.logTypeText,
                    item.type === 'masuk'
                      ? smartParkStyles.logTypeTextIn
                      : smartParkStyles.logTypeTextOut,
                  ] as any
                }
              >
                Kendaraan {item.type === 'masuk' ? 'Masuk' : 'Keluar'}
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
