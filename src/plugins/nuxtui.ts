import type { App } from 'vue'

// Configuration du thème NuxtUI
export const nuxtuiConfig = {
  defaultVariants: {
    Button: {
      color: 'primary',
      size: 'lg'
    },
    Card: {
      color: 'white'
    },
    Alert: {
      color: 'error',
      variant: 'soft'
    }
  }
}

export default {
  install: (app: App) => {
    // Injection de la configuration dans l'application
    app.provide('nuxtuiConfig', nuxtuiConfig)
  }
}
