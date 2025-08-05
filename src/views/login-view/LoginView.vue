<template>
  <UContainer class="min-h-screen flex items-center justify-center py-8 bg-white">
    <form class="flex flex-col items-center justify-center gap-y-4">
      <UInput icon="i-lucide-at-sign" size="xl" placeholder="Mail" class="w-full"/>
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
        >Se connecter avec google
      </UButton>
      <p>
        Pas encore inscrit ?
        <ULink raw to="/register" class="font-bold underline text-brand-700">Créer un compte</ULink>
      </p>
    </form>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const email = ref('')
const password = ref('')
const errMsg = ref()
</script>
