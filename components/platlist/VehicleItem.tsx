// VehicleItem.tsx - Updated untuk backend integration
import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

// Backend vehicle structure
interface BackendVehicle {
  plate: string
  description: string
}

interface VehicleItemProps {
  vehicle: BackendVehicle
  onEdit: (plate: string) => void
  onDelete: (plate: string) => void
}

export const VehicleItem: React.FC<VehicleItemProps> = ({
  vehicle,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={PlatListStyles.vehicleCard}>
      <View style={PlatListStyles.vehicleContent}>
        <Text style={PlatListStyles.plateNumber}>{vehicle.plate}</Text>
        <Text style={PlatListStyles.vehicleType}>
          {vehicle.description || 'Tidak ada deskripsi'}
        </Text>
      </View>

      <View style={PlatListStyles.buttonContainer}>
        <TouchableOpacity
          style={PlatListStyles.editButton}
          onPress={() => onEdit(vehicle.plate)}
        >
          <Text style={PlatListStyles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={PlatListStyles.deleteButton}
          onPress={() => onDelete(vehicle.plate)}
        >
          <Text style={PlatListStyles.deleteButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
