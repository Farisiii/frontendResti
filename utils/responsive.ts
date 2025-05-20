import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const isSmallDevice = width < 375
const isMediumDevice = width >= 375 && width < 414
const isLargeDevice = width >= 414

export const responsive = {
  fontSize: (small: number, medium: number, large: number) => {
    if (isSmallDevice) return small
    if (isMediumDevice) return medium
    return large
  },
  spacing: (small: number, medium: number, large: number) => {
    if (isSmallDevice) return small
    if (isMediumDevice) return medium
    return large
  },
  width: (percentage: number) => width * (percentage / 100),
  height: (percentage: number) => height * (percentage / 100),
  scaledSize: (size: number) => {
    const scale = width / 375
    const newSize = size * scale
    return Math.round(newSize)
  },
  isPortrait: () => height > width,
  isLandscape: () => width > height,
  adaptiveWidth: (portraitPercentage: number, landscapePercentage: number) => {
    const isPortrait = height > width
    return (
      width * ((isPortrait ? portraitPercentage : landscapePercentage) / 100)
    )
  },
  clampedSize: (size: number, min: number, max: number) => {
    return Math.min(Math.max(size, min), max)
  },
  edgeInsets: (small: number, medium: number, large: number) => {
    if (isSmallDevice) return small
    if (isMediumDevice) return medium
    return large
  },
  buttonSize: (portraitWidth: number, landscapeWidth: number) => {
    const currentWidth = responsive.isPortrait()
      ? responsive.adaptiveWidth(portraitWidth, portraitWidth)
      : responsive.adaptiveWidth(landscapeWidth, landscapeWidth)
    return responsive.clampedSize(currentWidth, 50, 100)
  },
  adaptiveHeight: (portraitPercentage: number, landscapePercentage: number) => {
    const isPortrait = height > width
    return (
      height * ((isPortrait ? portraitPercentage : landscapePercentage) / 100)
    )
  },
  responsiveMargin: (baseMargin: number) => {
    const scale = Math.min(width, height) / 375
    return Math.max(baseMargin * scale, 2)
  },
  responsivePadding: (basePadding: number) => {
    const scale = Math.min(width, height) / 375
    return Math.max(basePadding * scale, 4)
  },
  iconSize: (baseSize: number) => {
    return responsive.clampedSize(
      responsive.scaledSize(baseSize),
      baseSize * 0.7,
      baseSize * 1.3
    )
  },
  flexBasis: (
    portraitBasis: string | number,
    landscapeBasis: string | number
  ) => {
    return responsive.isPortrait() ? portraitBasis : landscapeBasis
  },
  borderRadius: (baseRadius: number) => {
    return responsive.clampedSize(
      responsive.scaledSize(baseRadius),
      baseRadius * 0.5,
      baseRadius * 1.5
    )
  },
}

export const screenDimensions = {
  width,
  height,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  aspectRatio: width / height,
}
