import { styles } from '@/styles/verificationStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

interface SuccessIconProps {
  iconSize: number
  successIconStyle: any
}

const SuccessIcon: React.FC<SuccessIconProps> = ({
  iconSize,
  successIconStyle,
}) => {
  return (
    <View style={styles.successIconContainer}>
      <View style={successIconStyle}>
        <Ionicons name="checkmark" size={iconSize} color="#F9F3C7" />
      </View>
    </View>
  )
}

export default SuccessIcon
