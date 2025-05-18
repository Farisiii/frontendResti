import { Stack } from 'expo-router'
import React from 'react'
import SmartParkScreen from '../../components/SmartParkScreen'

/**
 * Smart Park screen rendered using expo-router
 */
export default function SmartParkRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SmartParkScreen />
    </>
  )
}
