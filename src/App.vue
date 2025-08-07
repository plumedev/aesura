<template>
  <UApp>
    <StyleProvider>
      <ExampleProvider>
        <div style="min-height: 100vh; background-color: #f8f9fa;">
          <HeaderLayout v-if="authStore.isAuthenticated" />
          <RouterView />
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

const authStore = useAuthStore()

</script>
