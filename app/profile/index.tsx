import ProfileScreen from '@/screen/ProfileScreen'
import { Stack } from 'expo-router'
import React from 'react'

export default function LoginRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ProfileScreen />
    </>
  )
}
