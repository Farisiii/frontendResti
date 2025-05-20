import PlatListScreen from '@/components/screen/PlatListScreen'
import { Stack } from 'expo-router'
import React from 'react'

export default function PlatListRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PlatListScreen />
    </>
  )
}
