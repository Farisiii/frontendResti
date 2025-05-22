import { smartParkStyles } from "@/styles/smartParkStyles";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { ActivityLogItem } from "../../types/smartPark";

type ActivityLogListProps = {
  logs: ActivityLogItem[];
  onViewMore?: () => void;
};

/**
 * Activity Log List component for showing vehicle entry/exit history
 * With automatic scrolling when more than 8 items are present or based on screen height
 */
const ActivityLogList: React.FC<ActivityLogListProps> = ({
  logs,
  onViewMore,
}) => {
  const hasLogs = logs && logs.length > 0;

  if (!hasLogs) {
    return (
      <View style={smartParkStyles.activityLogContainerEmpty}>
        <View style={smartParkStyles.emptyStateContainer}>
          <Text style={smartParkStyles.emptyStateText}>
            Belum ada aktivitas kendaraan
          </Text>
        </View>
      </View>
    );
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
        >
          {logs.map((item) => (
            <View key={item.id} style={smartParkStyles.logRow}>
              <Text style={smartParkStyles.logIdText}>{item.id}</Text>
              <Text
                style={[
                  smartParkStyles.logTypeText,
                  item.type === "masuk"
                    ? smartParkStyles.logTypeTextIn
                    : smartParkStyles.logTypeTextOut,
                ]}
              >
                Kendaraan {item.type === "masuk" ? "Masuk" : "Keluar"}
              </Text>
              <Text style={smartParkStyles.logTimeText}>{item.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ActivityLogList;
