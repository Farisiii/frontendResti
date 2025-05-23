import PlatListStyles from '@/styles/PlatListStyles'
import React from 'react'
import {
  ActivityIndicator,
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
  isSaving?: boolean
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
  isSaving = false,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Only dismiss keyboard when touching outside the modal container */}
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={PlatListStyles.modalOverlay}>
            {/* Prevent touch events from bubbling up */}
            <TouchableWithoutFeedback onPress={() => {}}>
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
                      placeholder="Contoh: B1234ABC"
                      value={currentPlateNumber}
                      onChangeText={onChangePlateNumber}
                      placeholderTextColor={'#A0A0A0'}
                      autoCapitalize="characters"
                      editable={!isSaving}
                      // Explicitly enable touch events
                      pointerEvents={isSaving ? 'none' : 'auto'}
                    />
                    {plateNumberError ? (
                      <Text style={PlatListStyles.errorText}>
                        {plateNumberError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={PlatListStyles.formGroup}>
                    <Text style={PlatListStyles.formLabel}>
                      Deskripsi Kendaraan
                    </Text>
                    <TextInput
                      style={[
                        PlatListStyles.formInput,
                        vehicleTypeError ? PlatListStyles.inputError : null,
                      ]}
                      placeholder="Contoh: SUV, MPV, Sedan"
                      value={currentVehicleType}
                      onChangeText={onChangeVehicleType}
                      placeholderTextColor={'#A0A0A0'}
                      editable={!isSaving}
                      // Explicitly enable touch events
                      pointerEvents={isSaving ? 'none' : 'auto'}
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
                    style={[
                      PlatListStyles.cancelButton,
                      isSaving && { opacity: 0.5 },
                    ]}
                    onPress={onCancel}
                    disabled={isSaving}
                  >
                    <Text style={PlatListStyles.cancelButtonText}>Batal</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      PlatListStyles.saveButton,
                      isSaving && { opacity: 0.7 },
                    ]}
                    onPress={onSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <ActivityIndicator
                          size="small"
                          color="#FFFFFF"
                          style={{ marginRight: 8 }}
                        />
                        <Text style={PlatListStyles.saveButtonText}>
                          Menyimpan...
                        </Text>
                      </View>
                    ) : (
                      <Text style={PlatListStyles.saveButtonText}>Simpan</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default VehicleFormModal
