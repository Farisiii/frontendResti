import PinEntryScreen from '@/screen/PinEntryScreen'
import { Stack } from 'expo-router'
import React from 'react'

export default function PinEntryRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PinEntryScreen />
    </>
  )
}
