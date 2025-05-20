import TopUpScreen from '@/components/screen/TopUpScreen'
import { Stack } from 'expo-router'
import React from 'react'

export default function TopUpRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopUpScreen />
    </>
  )
}
