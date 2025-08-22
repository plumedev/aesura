<template>
  <UApp>
    <StyleProvider>
      <ExampleProvider>
        <div style="min-height: 100vh; background-color: #f8f9fa">
          <main class="bg-white min-h-screen">
            <!-- Afficher le contenu seulement quand l'authentification est prête -->
            <template v-if="authStore.isAuthReady">
              <HeaderLayout v-if="authStore.isAuthenticated" />
              <div
                id="content"
                class="flex flex-col w-full justify-center items-center"
              >
                <RouterView />
              </div>
            </template>
            <!-- Indicateur de chargement pendant l'initialisation -->
            <template v-else>
              <div class="flex items-center justify-center min-h-screen">
                <div class="text-center">
                  <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
                  ></div>
                  <p class="text-gray-600">Chargement...</p>
                </div>
              </div>
            </template>
          </main>
        </div>
      </ExampleProvider>
    </StyleProvider>
  </UApp>
</template>

<script lang="ts" setup>
  import HeaderLayout from './components/layout/headerLayout.vue'
  import ExampleProvider from './providers/ExampleProvider.vue'
  import StyleProvider from './providers/StyleProvider.vue'
  import { useAuthStore } from './stores/authStore'
  import { onMounted } from 'vue'

  const authStore = useAuthStore()

  // Initialiser l'écouteur d'authentification au démarrage de l'app
  onMounted(() => {
    authStore.initAuthListener()
  })
</script>
