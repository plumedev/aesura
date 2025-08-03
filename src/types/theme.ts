// Types pour la configuration du thème NuxtUI

export interface ColorPalette {
  [key: string]: {
    [shade: string]: string
  }
}

export interface DefaultVariants {
  Button?: {
    color?: string
    size?: string
    variant?: string
  }
  Card?: {
    color?: string
    variant?: string
  }
  Alert?: {
    color?: string
    variant?: string
  }
  [component: string]: any
}

export interface NuxtUIConfig {
  colors: ColorPalette
  defaultVariants: DefaultVariants
}

// Types pour les couleurs personnalisées
export type CustomColors = {
  primary: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string // #76E0B0
    600: string
    700: string
    800: string
    900: string
    950: string
  }
  gray: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string // #383838
  }
  green: Record<string, string>
  red: Record<string, string>
  yellow: Record<string, string>
  blue: Record<string, string>
}
