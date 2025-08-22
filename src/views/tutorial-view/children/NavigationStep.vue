<template>
  <div class="flex flex-row justify-between items-center w-full">
    <!-- Bouton Précédent (visible sauf à la première étape) -->
    <UButton
      v-if="currentStep > 0"
      leading-icon="i-lucide-arrow-left"
      size="xl"
      variant="outline"
      @click="goToPreviousStep"
    >
      Précédent
    </UButton>

    <!-- Espaceur quand il n'y a pas de bouton précédent -->
    <div v-else class="flex-1"></div>

    <!-- Bouton Suivant (visible sauf à la dernière étape) -->
    <UButton
      v-if="currentStep < totalStep - 1"
      trailing-icon="i-lucide-arrow-right"
      size="xl"
      @click="goToNextStep"
    >
      Suivant
    </UButton>

    <!-- Bouton Terminer (visible seulement à la dernière étape) -->
    <UButton
      v-else
      trailing-icon="i-lucide-check"
      size="xl"
      color="success"
      @click="finishTutorial"
    >
      Terminer
    </UButton>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    totalStep: number
    currentStep: number
  }

  interface Emits {
    (e: 'update:currentStep', value: number): void
    (e: 'finish'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const goToPreviousStep = () => {
    if (props.currentStep > 0) {
      emit('update:currentStep', props.currentStep - 1)
    }
  }

  const goToNextStep = () => {
    if (props.currentStep < props.totalStep - 1) {
      emit('update:currentStep', props.currentStep + 1)
    }
  }

  const finishTutorial = () => {
    emit('finish')
  }
</script>
