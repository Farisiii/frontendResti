import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Vehicle } from '../../types/vehicle'

interface VehicleItemProps {
  vehicle: Vehicle
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const VehicleItem: React.FC<VehicleItemProps> = ({
  vehicle,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={PlatListStyles.vehicleCard}>
      <View style={PlatListStyles.vehicleContent}>
        <Text style={PlatListStyles.plateNumber}>{vehicle.plateNumber}</Text>
        <Text style={PlatListStyles.vehicleType}>{vehicle.vehicleType}</Text>
      </View>
      <View style={PlatListStyles.buttonContainer}>
        <TouchableOpacity
          style={PlatListStyles.editButton}
          onPress={() => onEdit(vehicle.id)}
        >
          <Text style={PlatListStyles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={PlatListStyles.deleteButton}
          onPress={() => onDelete(vehicle.id)}
        >
          <Text style={PlatListStyles.deleteButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
