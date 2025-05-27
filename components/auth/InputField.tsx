import { authStyles } from '@/styles/authStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface InputFieldProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  iconName: keyof typeof Ionicons.glyphMap
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  secureTextEntry?: boolean
  showPassword?: boolean
  toggleShowPassword?: () => void
}

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  iconName,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  showPassword,
  toggleShowPassword,
}: InputFieldProps) {
  // Tampilkan icon mata jika ada fungsi toggleShowPassword (menandakan ini password field)
  const isPasswordField = toggleShowPassword !== undefined

  return (
    <View style={authStyles.inputContainer}>
      <Text style={authStyles.inputLabel}>{label}</Text>
      <View style={authStyles.inputWrapper}>
        <Ionicons
          name={iconName}
          size={20}
          color="#E53E3E"
          style={authStyles.inputIcon}
        />
        <TextInput
          style={authStyles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
        {isPasswordField && (
          <TouchableOpacity
            style={authStyles.eyeIcon}
            onPress={toggleShowPassword}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#E53E3E"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
