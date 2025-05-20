import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      setIsLoggedIn(!!userToken)
    } catch (error) {
      console.error('Error checking auth status:', error)
      setIsLoggedIn(false)
    }
  }

  if (isLoggedIn === null) {
    return null
  }

  if (isLoggedIn) {
    return <Redirect href="./smart-park" />
  }

  return <Redirect href="./login" />
}
