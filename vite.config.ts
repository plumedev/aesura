import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'brand',      // Bleu (#60a5fa) - couleur principale
          secondary: 'stone',    // Rouge (#f87171) - couleur secondaire
          neutral: 'neutral',    // Gris personnalisé
          success: 'brand',      // Utilise votre palette brand pour le succès
          warning: 'yellow',     // Jaune pour les avertissements
          error: 'red'          // Rouge pour les erreurs
        }
      }
    }),
    VueDevTools(),
    VueI18nPlugin({
      include: [
        path.resolve(__dirname, './src/assets/locales/**'),
        path.resolve(__dirname, './src/views/**/locales/*.json')
      ],
      strictMessage: false,
      compositionOnly: true
    })
  ],
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
