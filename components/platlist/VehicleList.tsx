import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { VehicleItem } from './VehicleItem'

// Backend vehicle structure
interface BackendVehicle {
  plate: string
  description: string
}

interface VehicleListProps {
  vehicles: BackendVehicle[]
  onEdit: (plate: string) => void
  onDelete: (plate: string) => void
  onRefresh?: () => void
  refreshing?: boolean
}

export const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onEdit,
  onDelete,
  onRefresh,
  refreshing = false,
}) => {
  const renderVehicleItem = ({ item }: { item: BackendVehicle }) => (
    <VehicleItem vehicle={item} onEdit={onEdit} onDelete={onDelete} />
  )

  return (
    <FlatList
      data={vehicles}
      keyExtractor={(item) => item.plate}
      renderItem={renderVehicleItem}
      contentContainerStyle={PlatListStyles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4A90E2"
            colors={['#4A90E2']}
          />
        ) : undefined
      }
    />
  )
}

export default VehicleList
