import PlatListStyles from '@/styles/PlatListStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { responsive } from '../../utils/responsive'

// Backend vehicle structure
interface BackendVehicle {
  plate: string
  description: string
}

type DeleteConfirmationModalProps = {
  isVisible: boolean
  vehicles: BackendVehicle[]
  selectedVehicleId: string | null // Ini sekarang berisi plate number
  isDeleting?: boolean // Add loading state prop
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({
  isVisible,
  vehicles,
  selectedVehicleId,
  isDeleting = false,
  onConfirm,
  onCancel,
}) => {
  // Cari vehicle berdasarkan plate (selectedVehicleId sekarang adalah plate)
  const selectedVehicle = vehicles.find((v) => v.plate === selectedVehicleId)

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
                  {selectedVehicle.plate}
                </Text>
                <Text style={PlatListStyles.confirmVehicleType}>
                  {selectedVehicle.description}
                </Text>
              </View>
            )}
          </View>

          <View style={PlatListStyles.modalFooter}>
            <TouchableOpacity
              style={[
                PlatListStyles.cancelButton,
                isDeleting && { opacity: 0.5 }, // Dim the button when deleting
              ]}
              onPress={onCancel}
              disabled={isDeleting} // Disable cancel button when deleting
            >
              <Text style={PlatListStyles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PlatListStyles.confirmButton,
                isDeleting && { opacity: 0.7 }, // Dim the button when deleting
              ]}
              onPress={onConfirm}
              disabled={isDeleting} // Disable confirm button when deleting
            >
              {isDeleting ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={PlatListStyles.confirmButtonText}>
                    Menghapus...
                  </Text>
                </View>
              ) : (
                <Text style={PlatListStyles.confirmButtonText}>Hapus</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
