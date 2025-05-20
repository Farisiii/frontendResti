import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PlatListStyles from '@/styles/PlatListStyles'
import { responsive } from '../../utils/responsive'

interface FloatingActionButtonProps {
  onPress: () => void
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={PlatListStyles.addButton} onPress={onPress}>
      <Ionicons name="add" size={responsive.iconSize(24)} color="#fff" />
    </TouchableOpacity>
  )
}
