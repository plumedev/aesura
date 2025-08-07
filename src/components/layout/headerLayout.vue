<template>
  <nav class="bg-white p-4 flex justify-between items-center">
    <img src="@/assets/logo.svg" alt="Aesura" />
    <ULink @click="handleLogout">Déconnexion</ULink>
  </nav>
</template>
<script setup lang="ts">
import { useAuthLogout } from '@/composables/useAuthLogout'

const { doRequest: logout } = useAuthLogout()

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}

</script>
