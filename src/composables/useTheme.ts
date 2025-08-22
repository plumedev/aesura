import { inject } from 'vue'
import type { NuxtUIConfig, CustomColors } from '@/types/theme'

export function useTheme() {
  const nuxtuiConfig = inject<NuxtUIConfig>('nuxtuiConfig')
  const colorPalette = inject<CustomColors>('colorPalette')

  const getColor = (
    colorName: keyof CustomColors,
    shade: string | number = 500
  ): string => {
    if (!colorPalette) return '#000000'

    const colorGroup = colorPalette[colorName]
    if (colorGroup && typeof colorGroup === 'object') {
      const colorMap = colorGroup as Record<string | number, string>
      return colorMap[shade] || colorMap[500] || '#000000'
    }
    return '#000000'
  }

  const getPrimaryColor = (shade: string | number = 500): string => {
    return getColor('primary', shade)
  }

  const getTextColor = (shade: string | number = 900): string => {
    return getColor('gray', shade)
  }

  const getDefaultVariants = () => {
    return nuxtuiConfig?.defaultVariants || {}
  }

  return {
    nuxtuiConfig,
    colorPalette,
    getColor,
    getPrimaryColor,
    getTextColor,
    getDefaultVariants,
  }
}
