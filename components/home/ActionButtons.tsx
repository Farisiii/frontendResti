import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { smartParkStyles } from '../../styles/smartParkStyles'

type ActionButtonsProps = {
  onTopUp: () => void
  onCheckVehicle: () => void
}

/**
 * Action Buttons component for displaying primary action buttons
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onTopUp,
  onCheckVehicle,
}) => {
  return (
    <View style={smartParkStyles.actionButtonsContainer}>
      <TouchableOpacity style={smartParkStyles.actionButton} onPress={onTopUp}>
        <Text style={smartParkStyles.actionButtonText}>TOP UP{'\n'}Saldo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={smartParkStyles.actionButton}
        onPress={onCheckVehicle}
      >
        <Text style={smartParkStyles.actionButtonText}>Cek{'\n'}Kendaraan</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ActionButtons
