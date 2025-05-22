import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { smartParkStyles } from '../styles/smartParkStyles'

type HeaderProps = {
  title: string
  onBackPress?: () => void
  showBackButton?: boolean
  onLogout?: () => void
  showLogoutButton?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  showBackButton = true,
  onLogout,
  showLogoutButton = false,
}) => {
  return (
    <View style={smartParkStyles.header}>
      {showBackButton && onBackPress ? (
        <TouchableOpacity
          style={smartParkStyles.backButton}
          onPress={onBackPress}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        // Placeholder untuk menjaga spacing ketika tidak ada back button
        <View style={smartParkStyles.backButton} />
      )}

      <Text
        style={[
          smartParkStyles.headerTitle,
          !showBackButton && { flex: 1, textAlign: 'center' },
        ]}
      >
        {title}
      </Text>

      {showLogoutButton && onLogout ? (
        <TouchableOpacity
          style={smartParkStyles.logoutButton}
          onPress={onLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        // Placeholder untuk menjaga spacing ketika tidak ada logout button
        <View style={smartParkStyles.logoutButton} />
      )}
    </View>
  )
}

export default Header
