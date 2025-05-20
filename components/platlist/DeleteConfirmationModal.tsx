import PlatListStyles from '@/styles/PlatListStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Vehicle } from '../../types/vehicle'
import { responsive } from '../../utils/responsive'

type DeleteConfirmationModalProps = {
  isVisible: boolean
  vehicles: Vehicle[]
  selectedVehicleId: string | null
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isVisible, vehicles, selectedVehicleId, onConfirm, onCancel }) => {
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId)

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={PlatListStyles.modalOverlay}>
        <View style={PlatListStyles.modalContainer}>
          <View style={PlatListStyles.modalHeaderHapus}>
            <Text style={PlatListStyles.modalTitleHapus}>Konfirmasi Hapus</Text>
          </View>

          <View style={PlatListStyles.modalBody}>
            <Ionicons
              name="alert-circle-outline"
              size={responsive.iconSize(48)}
              color="#E62132"
              style={PlatListStyles.warningIcon}
            />
            <Text style={PlatListStyles.modalMessage}>
              Apakah Anda yakin ingin menghapus kendaraan ini?
            </Text>
            {selectedVehicle && (
              <View style={PlatListStyles.vehicleInfoContainer}>
                <Text style={PlatListStyles.confirmPlateNumber}>
                  {selectedVehicle.plateNumber}
                </Text>
                <Text style={PlatListStyles.confirmVehicleType}>
                  {selectedVehicle.vehicleType}
                </Text>
              </View>
            )}
          </View>

          <View style={PlatListStyles.modalFooter}>
            <TouchableOpacity
              style={PlatListStyles.cancelButton}
              onPress={onCancel}
            >
              <Text style={PlatListStyles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={PlatListStyles.confirmButton}
              onPress={onConfirm}
            >
              <Text style={PlatListStyles.confirmButtonText}>Ya, Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
