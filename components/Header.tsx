import { smartParkStyles } from '@/styles/smartParkStyles'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type HeaderProps = {
  title: string
  onBackPress?: () => void
  showBackButton?: boolean
  onLogout?: () => void
  showLogoutButton?: boolean
  showProfileButton?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  showBackButton = true,
  onLogout,
  showLogoutButton = false,
  showProfileButton = false,
}) => {
  const handleProfilePress = () => {
    router.push('/profile')
  }

  // Auto show profile button when back button is shown
  const shouldShowProfileButton = showProfileButton || showBackButton

  return (
    <View style={smartParkStyles.header}>
      {/* Left Section - Back Button or Placeholder */}
      {showBackButton && onBackPress ? (
        <TouchableOpacity
          style={smartParkStyles.backButton}
          onPress={onBackPress}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={smartParkStyles.backButton} />
      )}

      {/* Center Section - Title */}
      <Text
        style={[
          smartParkStyles.headerTitle,
          !showBackButton &&
            !showLogoutButton &&
            !shouldShowProfileButton && {
              flex: 1,
              textAlign: 'center',
            },
        ]}
      >
        {title}
      </Text>

      {/* Right Section - Profile, Logout or Placeholder */}
      <View style={smartParkStyles.rightSection}>
        {shouldShowProfileButton && (
          <TouchableOpacity
            style={smartParkStyles.profileButton}
            onPress={handleProfilePress}
          >
            <Ionicons name="person-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        )}

        {showLogoutButton && onLogout ? (
          <TouchableOpacity
            style={[
              smartParkStyles.logoutButton,
              shouldShowProfileButton && { marginLeft: 8 },
            ]}
            onPress={onLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          !shouldShowProfileButton && (
            <View style={smartParkStyles.logoutButton} />
          )
        )}
      </View>
    </View>
  )
}

export default Header
