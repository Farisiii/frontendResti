import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { smartParkStyles } from '../styles/smartParkStyles'

type HeaderProps = {
  title: string
  onBackPress: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={smartParkStyles.header}>
      <TouchableOpacity
        style={smartParkStyles.backButton}
        onPress={onBackPress}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={smartParkStyles.headerTitle}>{title}</Text>
    </View>
  )
}

export default Header
