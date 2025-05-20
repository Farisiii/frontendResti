import { authStyles } from '@/styles/authStyles'
import React from 'react'
import { Image, Text, View } from 'react-native'

const LogoHeader: React.FC = () => {
  return (
    <View style={authStyles.header}>
      <View style={authStyles.logoContainer}>
        <View style={authStyles.logoImageContainer}>
          <Image
            source={require('../../assets/images/GOadaptive-icon.png')}
            style={authStyles.logoImage}
            resizeMode="cover"
          />
        </View>
        <Text style={authStyles.logoText}>Smart Parking GO</Text>
      </View>
    </View>
  )
}

export default LogoHeader
