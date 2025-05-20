import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

type VehicleFormModalProps = {
  isVisible: boolean
  isEditMode: boolean
  currentPlateNumber: string
  currentVehicleType: string
  plateNumberError: string
  vehicleTypeError: string
  isSmallScreen: boolean
  onChangePlateNumber: (text: string) => void
  onChangeVehicleType: (text: string) => void
  onSave: () => void
  onCancel: () => void
}

export const VehicleFormModal: React.FC<VehicleFormModalProps> = ({
  isVisible,
  isEditMode,
  currentPlateNumber,
  currentVehicleType,
  plateNumberError,
  vehicleTypeError,
  isSmallScreen,
  onChangePlateNumber,
  onChangeVehicleType,
  onSave,
  onCancel,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={PlatListStyles.modalOverlay}>
            <View
              style={[
                PlatListStyles.formModalContainer,
                isSmallScreen && PlatListStyles.formModalContainerSmall,
              ]}
            >
              <View style={PlatListStyles.modalHeaderEdit}>
                <Text style={PlatListStyles.modalTitleEdit}>
                  {isEditMode ? 'Edit Kendaraan' : 'Tambah Kendaraan'}
                </Text>
              </View>

              <View style={PlatListStyles.formModalBody}>
                <View style={PlatListStyles.formGroup}>
                  <Text style={PlatListStyles.formLabel}>Nomor Plat</Text>
                  <TextInput
                    style={[
                      PlatListStyles.formInput,
                      plateNumberError ? PlatListStyles.inputError : null,
                    ]}
                    placeholder="Contoh: B 1234 ABC"
                    value={currentPlateNumber}
                    onChangeText={onChangePlateNumber}
                    placeholderTextColor={'#A0A0A0'}
                    autoCapitalize="characters"
                  />
                  {plateNumberError ? (
                    <Text style={PlatListStyles.errorText}>
                      {plateNumberError}
                    </Text>
                  ) : null}
                </View>

                <View style={PlatListStyles.formGroup}>
                  <Text style={PlatListStyles.formLabel}>Jenis Kendaraan</Text>
                  <TextInput
                    style={[
                      PlatListStyles.formInput,
                      vehicleTypeError ? PlatListStyles.inputError : null,
                    ]}
                    placeholder="Contoh: SUV, MPV, Sedan"
                    value={currentVehicleType}
                    onChangeText={onChangeVehicleType}
                    placeholderTextColor={'#A0A0A0'}
                  />
                  {vehicleTypeError ? (
                    <Text style={PlatListStyles.errorText}>
                      {vehicleTypeError}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={PlatListStyles.modalFooter}>
                <TouchableOpacity
                  style={PlatListStyles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={PlatListStyles.cancelButtonText}>Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={PlatListStyles.saveButton}
                  onPress={onSave}
                >
                  <Text style={PlatListStyles.saveButtonText}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default VehicleFormModal
