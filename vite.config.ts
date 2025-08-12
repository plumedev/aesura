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
          error: 'red'
        },
        input: {
          slots: {
            root: 'bg-neutral-100 rounded-md',
            leading: 'text-primary-600',
            leadingIcon: 'text-primary-600',
            leadingAvatar: 'text-primary-600',
            trailing: 'text-primary-600',
            trailingIcon: 'text-primary-600',
          },
          defaultVariants: {
            variant: 'soft',
            color: 'primary',
            size: 'xl'
          }
        },
        button: {
          defaultVariants: {
            variant: 'solid',
            size: 'xl',
            color: 'primary',
          }
        },
        link : {
          base: 'text-brand-700',
          compoundVariants: [
            {
              active: false,
              disabled: false,
              class: [
                'hover:text-default',
                'transition-colors'
              ]
            }
          ]
        },
      },
      colorMode: false,
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
