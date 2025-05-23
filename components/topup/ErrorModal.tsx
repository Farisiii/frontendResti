import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { topUpStyles } from '../../styles/topupStyles'
import { responsive } from '../../utils/responsive'

interface ErrorModalProps {
  visible: boolean
  onClose: () => void
}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={topUpStyles.modalOverlay}>
        <View style={topUpStyles.modalContainer}>
          <View style={topUpStyles.modalHeader}>
            <Text style={topUpStyles.modalTitle}>Nominal Tidak Valid</Text>
          </View>

          <View style={topUpStyles.modalBody}>
            <Ionicons
              name="alert-circle-outline"
              size={responsive.scaledSize(48)}
              color="#E62132"
              style={topUpStyles.warningIcon}
            />
            <Text style={topUpStyles.modalMessage}>
              Nominal Top Up yang kamu masukkan tidak valid
            </Text>
            <View style={topUpStyles.infoContainer}>
              <Text style={topUpStyles.infoText}>
                Minimal Top Up Rp10.000 yaa
              </Text>
            </View>
          </View>

          <View style={topUpStyles.modalFooter}>
            <TouchableOpacity style={topUpStyles.okButton} onPress={onClose}>
              <Text style={topUpStyles.okButtonText}>OK, Saya Mengerti</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ErrorModal
