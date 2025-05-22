import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import InputField from '@/components/auth/InputField'
import LogoHeader from '@/components/auth/LogoHeader'
import { authStyles } from '@/styles/authStyles'

export type User = {
  id: string
  username: string
  email: string
}

const EXISTING_USERS = [
  {
    id: '1',
    username: 'user123',
    email: 'user@gmail.com',
  },
]

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const validateRegistration = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua field harus diisi')
      return false
    }

    if (username.length < 3) {
      Alert.alert('Error', 'Username minimal 3 karakter')
      return false
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(username)) {
      Alert.alert(
        'Error',
        'Username hanya boleh mengandung huruf, angka, dan underscore'
      )
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid')
      return false
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter')
      return false
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok')
      return false
    }

    const existingUser = EXISTING_USERS.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    )

    if (existingUser) {
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        Alert.alert('Error', 'Username sudah digunakan')
      } else {
        Alert.alert('Error', 'Email sudah terdaftar')
      }
      return false
    }

    return true
  }

  const handleRegister = async () => {
    if (!validateRegistration()) {
      return
    }

    setIsLoading(true)

    setTimeout(async () => {
      try {
        const newUserId = Date.now().toString()

        const newUser: User = {
          id: newUserId,
          username: username,
          email: email,
        }

        await AsyncStorage.setItem('userToken', newUser.id)
        await AsyncStorage.setItem('userData', JSON.stringify(newUser))

        setIsLoading(false)

        Alert.alert(
          'Berhasil!',
          'Akun berhasil dibuat. Anda akan diarahkan ke halaman utama.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/smart-park'),
            },
          ]
        )
      } catch (error) {
        console.error('Error storing user data:', error)
        setIsLoading(false)
        Alert.alert('Error', 'Gagal membuat akun. Silakan coba lagi.')
      }
    }, 1500)
  }

  const handleBackToLogin = () => {
    router.push('/login')
  }

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#E53E3E" />
      <ScrollView
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LogoHeader />

        <View style={authStyles.formContainer}>
          <InputField
            label="Username"
            placeholder="Masukkan username Anda"
            value={username}
            onChangeText={setUsername}
            iconName="person-outline"
            autoCapitalize="none"
          />

          <InputField
            label="Email"
            placeholder="Masukkan email Anda"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            placeholder="Masukkan password Anda"
            value={password}
            onChangeText={setPassword}
            iconName="lock-closed-outline"
            secureTextEntry={true}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          <InputField
            label="Konfirmasi Password"
            placeholder="Masukkan ulang password Anda"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            iconName="lock-closed-outline"
            secureTextEntry={true}
            showPassword={showConfirmPassword}
            toggleShowPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          <TouchableOpacity
            style={[
              authStyles.loginButton,
              isLoading && authStyles.loginButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={authStyles.loginButtonText}>
              {isLoading ? 'Mendaftar...' : 'DAFTAR'}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.dividerContainer}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>ATAU</Text>
            <View style={authStyles.dividerLine} />
          </View>

          <View style={authStyles.signUpContainer}>
            <Text style={authStyles.signUpText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={authStyles.signUpLink}>Masuk Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
