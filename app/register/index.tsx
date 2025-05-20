import RegisterScreen from '@/components/screen/RegisterScreen'
import { Stack } from 'expo-router'
import React from 'react'

export default function RegisterRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RegisterScreen />
    </>
  )
}
