<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <form class="flex flex-col items-center justify-center gap-y-4">
      <UInput
        icon="i-lucide-at-sign"
        size="xl"
        placeholder="Mail"
        class="w-full"
      />
      <UInput
        v-model="password"
        placeholder="Mot de passe"
        :type="show ? 'text' : 'password'"
        size="xl"
        icon="i-lucide-lock"
      >
        <template #trailing>
          <UButton
            variant="link"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
      <UButton block class="bg-brand-600">Se connecter</UButton>
      <USeparator label="OU" size="sm" color="primary" class="text-brand-600" />
      <UButton
        class="bg-primary-300 text-brand-700"
        block
        size="xl"
        leading-icon="i-lucide-key-round"
        :loading="isLoading"
        :disabled="isLoading"
        @click="handleGoogleSignIn()"
      >
        {{ isLoading ? 'Connexion en cours...' : 'Se connecter avec Google' }}
      </UButton>

      <UAlert
        v-if="isError && errorMessage"
        :title="errorMessage"
        color="error"
        variant="soft"
        class="w-full"
      />

      <p>
        Pas encore inscrit ?
        <ULink raw to="/register" class="font-bold underline text-brand-700"
          >Créer un compte</ULink
        >
      </p>
    </form>
  </UContainer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthGoogle } from './composables/useAuthGoogle'
  import RouteName from '@/router/RouteName'

  const show = ref(false)
  const password = ref('')

  const {
    doRequest: signInWithGoogle,
    isLoading,
    isError,
    errorMessage,
  } = useAuthGoogle()

  // Gérer la connexion Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(RouteName.HOME)
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error)
    }
  }
</script>
