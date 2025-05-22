import { DUMMY_USERS } from '@/api/fakeAccount'
import { User } from '@/types/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const validateLogin = (email: string, password: string): User | null => {
  const user = DUMMY_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )

  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }
  return null
}

export const storeUserData = async (user: User): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('userToken', user.id)
    await AsyncStorage.setItem('userData', JSON.stringify(user))
    return true
  } catch (error) {
    console.error('Error storing user data:', error)
    return false
  }
}

export const validateEmail = (email: string): boolean => {
  return email.includes('@')
}

export const loginUser = async (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: () => void,
  setIsLoading: (loading: boolean) => void
): Promise<void> => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields')
    return
  }

  if (!validateEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address')
    return
  }

  setIsLoading(true)

  setTimeout(async () => {
    const user = validateLogin(email, password)

    if (user) {
      const success = await storeUserData(user)

      if (success) {
        setIsLoading(false)
        onSuccess()
      } else {
        setIsLoading(false)
        Alert.alert('Error', 'Login failed. Please try again.')
      }
    } else {
      setIsLoading(false)
      Alert.alert(
        'Login Gagal',
        'Email atau password tidak valid. Coba:\n\nUser: user@gmail.com / user123'
      )
      onError()
    }
  }, 1500)
}

export const resetPassword = (email: string): boolean => {
  if (!email) {
    Alert.alert('Error', 'Masukkan email Anda')
    return false
  }

  if (!validateEmail(email)) {
    Alert.alert('Error', 'Masukkan email yang valid')
    return false
  }

  Alert.alert(
    'Berhasil',
    'Link reset password telah dikirim ke email Anda. Silakan cek inbox atau spam folder.'
  )

  return true
}
