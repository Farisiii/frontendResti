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
} from "react-native";

import { loginUser } from '@/api/smartParkService'
import InputField from '@/components/auth/InputField'
import LogoHeader from '@/components/auth/LogoHeader'
import { authStyles } from '@/styles/authStyles'

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const validateLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi')
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

    return true
  }

  const handleLogin = async () => {
    if (!validateLogin()) {
      return
    }

    setIsLoading(true)

    try {
      console.log('Attempting login with email:', email)

      const result = await loginUser(email.trim().toLowerCase(), password)

      console.log('Login result:', {
        success: result.success,
        hasUser: !!result.user,
        hasToken: !!result.token,
        error: result.error,
      })

      if (!result.success) {
        Alert.alert(
          'Gagal Masuk',
          result.error || 'Email atau password salah. Silakan coba lagi.'
        )
        return
      }

      if (result.success && result.user && result.token) {
        console.log('Login successful, user data:', {
          username: result.user.username,
          email: result.user.email,
          userID: result.user.userID,
          role: result.user.role,
        })

        Alert.alert('Berhasil!', 'Login berhasil. Selamat datang!')
        router.replace('/smart-park')
      } else {
        Alert.alert(
          'Gagal Masuk',
          'Terjadi kesalahan saat login. Silakan coba lagi.'
        )
      }
    } catch (error: any) {
      console.error('Login error:', error)

      // Handle specific error messages
      let errorMessage = 'Terjadi kesalahan jaringan. Silakan coba lagi.'

      if (error.message) {
        if (
          error.message.includes('Invalid credentials') ||
          error.message.includes('tidak valid') ||
          error.message.includes('wrong password') ||
          error.message.includes('user not found')
        ) {
          errorMessage = 'Email atau password salah. Silakan periksa kembali.'
        } else if (
          error.message.includes('Network Error') ||
          error.message.includes('timeout')
        ) {
          errorMessage =
            'Koneksi bermasalah. Periksa internet Anda dan coba lagi.'
        } else if (error.message.includes('Account not verified')) {
          errorMessage = 'Akun belum diverifikasi. Silakan periksa email Anda.'
        } else if (error.message.includes('Account suspended')) {
          errorMessage = 'Akun Anda telah dinonaktifkan. Hubungi administrator.'
        } else {
          errorMessage = error.message
        }
      }

      Alert.alert('Error', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoToRegister = () => {
    router.push('/register')
  }

  const handleForgotPassword = () => {
    Alert.alert(
      'Lupa Password',
      'Fitur reset password akan segera tersedia. Silakan hubungi administrator untuk bantuan.',
      [{ text: 'OK' }]
    )
  }

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle='light-content' backgroundColor='#E53E3E' />
      <ScrollView
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <LogoHeader />

        <View style={authStyles.formContainer}>
          <InputField
            label='Email'
            placeholder='Masukkan email Anda'
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label='Password'
            placeholder='Masukkan password Anda'
            value={password}
            onChangeText={setPassword}
            iconName="lock-closed-outline"
            secureTextEntry={!showPassword}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={authStyles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={authStyles.forgotPasswordText}>Lupa Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              authStyles.loginButton,
              isLoading && authStyles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={authStyles.loginButtonText}>
              {isLoading ? "Masuk..." : "MASUK"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.dividerContainer}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>ATAU</Text>
            <View style={authStyles.dividerLine} />
          </View>

          <View style={authStyles.signUpContainer}>
            <Text style={authStyles.signUpText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={handleGoToRegister}>
              <Text style={authStyles.signUpLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
