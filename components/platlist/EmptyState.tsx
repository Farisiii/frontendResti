import PlatListStyles from '@/styles/PlatListStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { responsive } from '../../utils/responsive'

export const EmptyState: React.FC = () => {
  return (
    <View style={PlatListStyles.emptyContainer}>
      <Ionicons
        name="car-outline"
        size={responsive.iconSize(64)}
        color="#E62132"
      />
      <Text style={PlatListStyles.emptyText}>
        Tidak ada kendaraan ditemukan
      </Text>
      <Text style={PlatListStyles.emptySubText}>
        Coba kata kunci pencarian lain
      </Text>
    </View>
  )
}
