<template>
  <p class="text-md font-semibold uppercase text-brand-600">
    {{ $t('progress.step', { currentStep: currentStep + 1, totalStep: totalStep }) }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  totalStep: number
  currentStep: number
}>()
</script>
