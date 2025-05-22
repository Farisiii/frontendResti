import { handleSignUp } from '@/utils/navigation'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import ForgotPasswordModal from '@/components/auth/ForgotPasswordModal'
import InputField from '@/components/auth/InputField'
import LogoHeader from '@/components/auth/LogoHeader'

import { authStyles } from '@/styles/authStyles'

import { loginUser } from '@/utils/auth'

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] =
    useState<boolean>(false)
  const router = useRouter()

  const handleLogin = async () => {
    await loginUser(
      email,
      password,
      () => router.replace('/smart-park'),
      () => {},
      setIsLoading
    )
  }

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true)
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
        {/* Header */}
        <LogoHeader />

        {/* Form Container */}
        <View style={authStyles.formContainer}>
          {/* Email Input */}
          <InputField
            label="Email"
            placeholder="Masukkan email Anda"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            keyboardType="email-address"
          />

          {/* Password Input */}
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

          {/* Forgot Password */}
          <TouchableOpacity
            style={authStyles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={authStyles.forgotPasswordText}>Lupa Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              authStyles.loginButton,
              isLoading && authStyles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={authStyles.loginButtonText}>
              {isLoading ? 'Masuk...' : 'MASUK'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={authStyles.dividerContainer}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>ATAU</Text>
            <View style={authStyles.dividerLine} />
          </View>

          {/* Sign Up Link */}
          <View style={authStyles.signUpContainer}>
            <Text style={authStyles.signUpText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={authStyles.signUpLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        visible={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
