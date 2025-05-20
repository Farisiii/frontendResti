import Verification from '@/components/screen/Verification'
import { Stack } from 'expo-router'
import React from 'react'

export default function SmartParkRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Verification />
    </>
  )
}
