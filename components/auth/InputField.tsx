import { authStyles } from '@/styles/authStyles'
import { responsive } from '@/utils/responsive'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface InputFieldProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  iconName: any
  secureTextEntry?: boolean
  showPassword?: boolean
  toggleShowPassword?: () => void
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  iconName,
  secureTextEntry = false,
  showPassword = false,
  toggleShowPassword,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  return (
    <View style={authStyles.inputContainer}>
      <Text style={authStyles.inputLabel}>{label}</Text>
      <View style={authStyles.inputWrapper}>
        <Ionicons
          name={iconName}
          size={responsive.fontSize(18, 20, 22)}
          color="#E53E3E"
          style={authStyles.inputIcon}
        />
        <TextInput
          style={authStyles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {secureTextEntry && toggleShowPassword && (
          <TouchableOpacity
            style={authStyles.eyeIcon}
            onPress={toggleShowPassword}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={responsive.fontSize(18, 20, 22)}
              color="#E53E3E"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default InputField
