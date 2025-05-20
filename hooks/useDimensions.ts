import { useEffect, useState } from 'react'
import { Dimensions, Platform } from 'react-native'

export interface DimensionsState {
  window: {
    width: number
    height: number
  }
  screen: {
    width: number
    height: number
  }
}

export interface DimensionResults {
  dimensions: DimensionsState
  isWeb: boolean
  isPortrait: boolean
  isSmallScreen: boolean
}

export const useDimensions = (): DimensionResults => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  })

  const isWeb = Platform.OS === 'web'

  const isPortrait = dimensions.window.height > dimensions.window.width

  const isSmallScreen = dimensions.window.width < 375

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen })
      }
    )

    return () => subscription?.remove()
  }, [])

  return {
    dimensions,
    isWeb,
    isPortrait,
    isSmallScreen,
  }
}
