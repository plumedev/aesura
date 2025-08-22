import type { App } from 'vue'

// Configuration du thème NuxtUI
export const nuxtuiConfig = {}

export default {
  install: (app: App) => {
    // Injection de la configuration dans l'application
    app.provide('nuxtuiConfig', nuxtuiConfig)
  },
}
