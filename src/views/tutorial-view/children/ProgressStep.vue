<template>
  <p class="text-md font-semibold uppercase text-brand-600">
    étape {{ currentStep + 1 }} sur {{ totalStep }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  totalStep: number
  currentStep: number
}>()
</script>
