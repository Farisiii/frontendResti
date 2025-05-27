import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  BackHandler,
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
import { SafeAreaView } from 'react-native-safe-area-context'

// Configuration
const API_BASE_URL = 'https://smartpark-backend.vercel.app/api'

export type User = {
  userID: string
  username: string
  email: string
  role: 'user' | 'admin'
  vehicles: Array<{
    plate: string
    description: string
  }>
  rfid?: string
}

export type RegisterResponse = {
  status: 'success' | 'error'
  data?: User
  message?: string
  error?: string
}

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // Handle back button untuk keluar dari aplikasi
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Keluar Aplikasi',
        'Apakah Anda yakin ingin keluar dari aplikasi?',
        [
          {
            text: 'Batal',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Keluar',
            onPress: () => BackHandler.exitApp(),
          },
        ]
      )
      return true // Prevent default behavior
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

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

    return true
  }

  const registerUser = async (): Promise<RegisterResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          vehicles: [], // Default empty array, bisa ditambah nanti
          role: 'user', // Default role
        }),
      })

      const data: RegisterResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const handleRegister = async () => {
    if (!validateRegistration()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await registerUser()

      if (result.status === 'success' && result.data) {
        // Simpan data user ke AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(result.data))
        console.log('User data saved:', result.data)
        router.push('/login')

        // Jika server juga mengembalikan token di registrasi, simpan juga
        // await AsyncStorage.setItem('userToken', token)
      } else {
        Alert.alert('Error', result.message || 'Registrasi gagal')
      }
    } catch (error: any) {
      console.error('Registration error:', error)

      let errorMessage = 'Gagal membuat akun. Silakan coba lagi.'

      if (error.message) {
        errorMessage = error.message
      }

      // Handle specific error cases
      if (error.message?.includes('Email already registered')) {
        errorMessage = 'Email sudah terdaftar'
      } else if (error.message?.includes('already registered')) {
        errorMessage = 'Email atau username sudah digunakan'
      } else if (error.message?.includes('Network')) {
        errorMessage = 'Tidak dapat terhubung ke server'
      }

      Alert.alert('Error', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push('/login')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView
        style={authStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="light-content" backgroundColor="#E53E3E" />

        {/* Header tetap di atas, tidak di-scroll */}
        <LogoHeader />

        {/* Form container yang bisa di-scroll */}
        <View style={[authStyles.formContainer, { flex: 1 }]}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 0, // Remove padding karena sudah ada di formContainer
              paddingBottom: 20,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
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
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />

            <InputField
              label="Konfirmasi Password"
              placeholder="Masukkan ulang password Anda"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              iconName="lock-closed-outline"
              secureTextEntry={!showConfirmPassword}
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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
