<template>
  <UApp>
    <StyleProvider>
      <ExampleProvider>
        <div style="min-height: 100vh; background-color: #f8f9fa;">
          <RouterView />
        </div>
      </ExampleProvider>
    </StyleProvider>
  </UApp>
</template>

<script lang="ts" setup>
import ExampleProvider from './providers/ExampleProvider.vue'
import StyleProvider from './providers/StyleProvider.vue'
</script>
