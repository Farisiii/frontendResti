import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import { FlatList } from 'react-native'
import { Vehicle } from '../../types/vehicle'
import { VehicleItem } from './VehicleItem'

interface VehicleListProps {
  vehicles: Vehicle[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onEdit,
  onDelete,
}) => {
  const renderVehicleItem = ({ item }: { item: Vehicle }) => (
    <VehicleItem vehicle={item} onEdit={onEdit} onDelete={onDelete} />
  )

  return (
    <FlatList
      data={vehicles}
      keyExtractor={(item) => item.id}
      renderItem={renderVehicleItem}
      contentContainerStyle={PlatListStyles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default VehicleList
