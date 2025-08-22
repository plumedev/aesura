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
          primary: 'brand',
          secondary: 'stone',
          neutral: 'neutral',
          success: 'brand',
          warning: 'yellow',
          error: 'red',
        },
        input: {
          defaultVariants: {
            variant: 'soft',
            color: 'primary',
            size: 'xl',
          },
          variants: {
            soft: 'text-highlighted bg-red-50 hover:bg-red-100 focus:bg-red-100 disabled:bg-red-50/50',
          },
        },
        button: {
          defaultVariants: {
            variant: 'solid',
            size: 'xl',
            color: 'primary',
          },
        },
        select: {
          defaultVariants: {
            size: 'md',
            color: 'primary',
            variant: 'outline',
          },
        },
      },
      colorMode: false,
    }),
    VueDevTools(),
    VueI18nPlugin({
      include: [
        path.resolve(__dirname, './src/assets/locales/**'),
        path.resolve(__dirname, './src/views/**/locales/*.json'),
      ],
      strictMessage: false,
      compositionOnly: true,
    }),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
