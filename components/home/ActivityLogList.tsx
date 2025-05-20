import { smartParkStyles } from '@/styles/smartParkStyles'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ActivityLogItem } from '../../types/smartPark'

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

      <View style={smartParkStyles.activityLogContainer}>
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
