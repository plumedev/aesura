<template>
  <div>
    <!-- Le provider encapsule les composants enfants -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

// État partagé du provider
const showNotification = ref(false)
const notificationMessage = ref('')

// Service que le provider expose aux composants enfants
const notificationService = {
  show: (message: string) => {
    notificationMessage.value = message
    showNotification.value = true
  }
}

// Injection du service pour les composants enfants
provide('notificationService', notificationService)

// Exemple d'initialisation au montage
console.log('ExampleProvider initialisé - Service de notification disponible')
</script>
