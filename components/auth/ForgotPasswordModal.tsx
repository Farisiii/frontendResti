import { authStyles } from '@/styles/authStyles'
import { resetPassword } from '@/utils/authService'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import InputField from './InputField'

interface ForgotPasswordModalProps {
  visible: boolean
  onClose: () => void
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const [resetEmail, setResetEmail] = useState<string>('')

  const handleResetPassword = () => {
    const success = resetPassword(resetEmail)
    if (success) {
      onClose()
      setResetEmail('')
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={authStyles.modalOverlay}>
        <View style={authStyles.modalContainer}>
          <View style={authStyles.modalHeader}>
            <Text style={authStyles.modalTitle}>Reset Password</Text>
            <TouchableOpacity style={authStyles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={authStyles.modalDescription}>
            Masukkan email Anda dan kami akan mengirimkan link untuk reset
            password.
          </Text>

          <View style={authStyles.modalInputContainer}>
            <InputField
              label="Email"
              placeholder="Masukkan email Anda"
              value={resetEmail}
              onChangeText={setResetEmail}
              iconName="mail-outline"
              keyboardType="email-address"
            />
          </View>

          <View style={authStyles.modalButtonContainer}>
            <TouchableOpacity
              style={authStyles.cancelButton}
              onPress={() => {
                onClose()
                setResetEmail('')
              }}
            >
              <Text style={authStyles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={authStyles.resetButton}
              onPress={handleResetPassword}
            >
              <Text style={authStyles.resetButtonText}>Kirim Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ForgotPasswordModal
