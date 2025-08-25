<template>
  <div
    class="flex flex-col justify-between md:flex-row h-full max-w-10/10 lg:max-w-9/10 xl:max-w-9/10 min-h-[calc(100vh-100px)]"
  >
    <div
      class="flex flex-col w-full justify-center items-center p-4 py-4 bg-pr"
    >
      <UCard
        class="w-full h-full border border-primary-500 bg-[url('@/assets/images/bg-first-connexion.png')] bg-contain bg-no-repeat bg-bottom relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-b from-brand-700 from-0% to-brand-600 to-100% pointer-events-none mix-blend-multiply"
        ></div>
        <UAlert
          class="bg-transparen mb-6 relative z-10"
          description="Bienvenue dans l'assistant de configuration. Quelques étapes vous permettront de fournir des informations nécessaires au bon fonctionnement de Aesura."
          icon="i-lucide-info"
        />
        <UStepper
          v-model="currentStep"
          orientation="vertical"
          :items="items"
          class="w-full relative z-10"
          size="lg"
          :ui="{
            title: 'text-white text-xl font-bold',
            description: 'text-white',
          }"
        />
      </UCard>
    </div>

    <div id="stepper-content" class="flex flex-col w-full p-4 py-4 m-4 ms-0">
      <ProgressStep
        v-if="currentStep !== 3"
        :total-step="3"
        :current-step="currentStep"
      />
      <TutorialStepOne v-if="currentStep === 0" />
      <TutorialStepTwo v-if="currentStep === 1" />
      <TutorialStepThree v-if="currentStep === 2" />
      <TutorialStepResume v-if="currentStep === 3" />

      <NavigationStep
        :total-step="3"
        :current-step="currentStep"
        @update:current-step="handleStepChange"
        @finish="handleFinishTutorial"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSetTutorialStatus } from '@/composables/firebase/useSetTutorialStatus'
  import type { StepperItem } from '@nuxt/ui'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavigationStep from './children/NavigationStep.vue'
  import ProgressStep from './children/ProgressStep.vue'
  import TutorialStepOne from './children/TutorialStepOne.vue'
  import TutorialStepResume from './children/TutorialStepResume.vue'
  import TutorialStepThree from './children/TutorialStepThree.vue'
  import TutorialStepTwo from './children/TutorialStepTwo.vue'

  interface Props {
    step?: string
  }

  const props = defineProps<Props>()
  const router = useRouter()
  const currentStep = ref(0)

  const { doRequest: updateTutorialStatus } = useSetTutorialStatus()

  const items = ref<StepperItem[]>([
    {
      title: 'Personnalisez et ajoutez des comptes',
      description:
        'Donnez un nom a votre compte principal et ajoutez autant de compte que vous le souhaitez.',
      icon: 'i-lucide-piggy-bank',
    },
    {
      title: 'Ajoutez vos charges fixes',
      description:
        'Listez vos charges fixes et dépenses récurrentes pour définir la part de votre budget incompressible.',
      icon: 'i-lucide-list-restart',
    },
    {
      title: 'Ajoutez vos revenus',
      description: 'Listez vos revenus récurrents comme votre salaire.',
      icon: 'i-lucide-list-plus',
    },
    {
      title: 'Résumé et finalisation',
      description:
        'Récapitulatif de votre configuration et finalisation du tutoriel.',
      icon: 'i-lucide-check-circle',
    },
  ])

  const handleFinishTutorial = () => {
    currentStep.value = 3
    if (currentStep.value === 3) {
      updateTutorialStatus(false)
      router.push({ name: 'home' })
    }
  }

  const stepMappingUrl = {
    0: 'accounts',
    1: 'expenses',
    2: 'revenues',
    3: 'resume',
  }

  const initializeStepFromUrl = () => {
    if (props.step) {
      const stepParam = props.step
      const stepIndex = Object.values(stepMappingUrl).indexOf(stepParam)
      if (stepIndex !== -1) {
        currentStep.value = stepIndex
      }
    }
  }

  const handleStepChange = (step: number) => {
    currentStep.value = step
    const stepParam = stepMappingUrl[step as keyof typeof stepMappingUrl]
    if (stepParam) {
      router.push({ name: 'tutorial-step', params: { step: stepParam } })
    }
  }

  onMounted(() => {
    initializeStepFromUrl()
  })
</script>
